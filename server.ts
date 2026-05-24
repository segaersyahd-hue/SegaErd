import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: key || "",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ==========================================
// DUMMY DATABASE (IN-MEMORY)
// ==========================================
interface DummySchedule {
  id: string;
  platform: string;
  time: string;
  title: string;
  date: number;
  content?: string;
}

interface DummyCampaign {
  id: string;
  name: string;
  status: "active" | "completed" | "draft";
  sent: number;
  opened: number;
  date: string;
}

interface DummyDraft {
  id: string;
  title: string;
  content: string;
  hashtags: string[];
  platform: "instagram" | "facebook" | "tiktok";
  status: "draft" | "scheduled" | "published";
  createdAt: string;
}

let schedules: DummySchedule[] = [
  { id: "s1", platform: "instagram", time: "19:00", title: "Promo Coffee Latte 20%", date: 24, content: "Kopi susu nikmat segar dari biji kopi arabika pilihan di sore hari!" },
  { id: "s2", platform: "facebook", time: "10:30", title: "Soft Opening Cabang Kemang", date: 26, content: "Grand opening Kedai Kopi Modern cabang Jakarta Selatan. Ada free donat!" },
  { id: "s3", platform: "tiktok", time: "21:00", title: "Behind the Scene Roasting", date: 28, content: "Proses roasting kopi dari biji kopi arabika single-origin pilihan langsung dipanggang oleh ahlinya!" },
];

let campaigns: DummyCampaign[] = [
  { id: "c1", name: "Promo Coffee Late", status: "completed", sent: 1200, opened: 980, date: "12 May 2026" },
  { id: "c2", name: "Diskon Akhir Pekan", status: "active", sent: 800, opened: 450, date: "Today" },
  { id: "c3", name: "Retensi Pelanggan Pasif", status: "draft", sent: 0, opened: 0, date: "-" },
];

let drafts: DummyDraft[] = [
  {
    id: "d1",
    title: "Draf Caption Kopi Gula Aren",
    content: "Opsi 1:\nMulai harimu dengan es kopi gula aren terbaik dari brand lokal kebanggaan kita! Manisnya pas, semangatnya nendang!",
    hashtags: ["#umkm", "#kopisusu", "#coffeehunter", "#rekomendasikopi"],
    platform: "instagram",
    status: "draft",
    createdAt: "2026-05-24T10:00:00.000Z"
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Get schedules
  app.get("/api/schedules", (req, res) => {
    res.json({ success: true, data: schedules });
  });

  // Add schedule
  app.post("/api/schedules", (req, res) => {
    const { platform, time, title, date, content } = req.body;
    if (!platform || !time || !title || !date) {
      return res.status(400).json({ success: false, message: "Parameter tidak lengkap." });
    }
    const newSchedule: DummySchedule = {
      id: "s" + Date.now(),
      platform,
      time,
      title,
      date: Number(date),
      content: content || ""
    };
    schedules.push(newSchedule);
    res.json({ success: true, data: newSchedule });
  });

  // Delete schedule
  app.delete("/api/schedules/:id", (req, res) => {
    schedules = schedules.filter(s => s.id !== req.params.id);
    res.json({ success: true, message: "Jadwal berhasil dihapus." });
  });

  // Get campaigns
  app.get("/api/campaigns", (req, res) => {
    res.json({ success: true, data: campaigns });
  });

  // Add campaign
  app.post("/api/campaigns", (req, res) => {
    const { name, status, sent, opened } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Nama kampanye harus diisi." });
    }
    const newCampaign: DummyCampaign = {
      id: "c" + Date.now(),
      name,
      status: status || "draft",
      sent: Number(sent || 0),
      opened: Number(opened || 0),
      date: "Today"
    };
    campaigns.push(newCampaign);
    res.json({ success: true, data: newCampaign });
  });

  // Delete campaign
  app.delete("/api/campaigns/:id", (req, res) => {
    campaigns = campaigns.filter(c => c.id !== req.params.id);
    res.json({ success: true, message: "Kampanye berhasil dihapus." });
  });

  // Get drafts
  app.get("/api/drafts", (req, res) => {
    res.json({ success: true, data: drafts });
  });

  // Add draft
  app.post("/api/drafts", (req, res) => {
    const { title, content, hashtags, platform } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Judul dan konten draf harus diisi." });
    }
    const newDraft: DummyDraft = {
      id: "d" + Date.now(),
      title,
      content,
      hashtags: hashtags || [],
      platform: platform || "instagram",
      status: "draft",
      createdAt: new Date().toISOString()
    };
    drafts.push(newDraft);
    res.json({ success: true, data: newDraft });
  });

  // Delete draft
  app.delete("/api/drafts/:id", (req, res) => {
    drafts = drafts.filter(d => d.id !== req.params.id);
    res.json({ success: true, message: "Draf berhasil dihapus." });
  });

  app.post("/api/content/generate", async (req, res) => {
    const { businessType, tone, prompt } = req.body;
    
    if (!businessType || !prompt) {
      return res.status(400).json({ success: false, message: "Jenis bisnis dan topik promosi harus diisi." });
    }

    try {
      const ai = getGeminiClient();
      const generationPrompt = `Kamu adalah spesialis digital marketing untuk UMKM Indonesia. 
Buatkan 3 opsi caption media sosial (Instagram/TikTok), hashtag populer, dan ide visual untuk promosi berikut:
Jenis Bisnis: ${businessType}
Tone: ${tone}
Topik Promosi: ${prompt}

Berikan jawaban dalam format yang rapi dan menarik dengan pemisahan opsi yang jelas (Opsi 1, Opsi 2, Opsi 3).`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: generationPrompt,
      });

      res.json({ success: true, text: response.text });
    } catch (err: any) {
      console.error("Gemini Error:", err);
      res.status(500).json({ success: false, message: "Maaf, terjadi masalah koneksi dengan AI. Silakan coba sesaat lagi." });
    }
  });

  // Mock Auth Routes
  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    // Simple mock logic
    if (email && password) {
      res.json({ 
        success: true, 
        user: { 
          id: "u1", 
          email, 
          name: email.split("@")[0],
          role: "user" 
        },
        token: "mock-jwt-token"
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  });

  app.post("/api/auth/register", (req, res) => {
    const { email, password, name } = req.body;
    res.json({ 
      success: true, 
      user: { id: "u2", email, name, role: "user" },
      token: "mock-jwt-token"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 UMKMBoost Server running on http://localhost:${PORT}`);
  });
}

startServer();
