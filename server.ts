import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
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
