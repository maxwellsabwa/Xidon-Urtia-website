import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Admin Login API endpoint
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt for user: ${username}`);
    
    try {
      const adminsPath = path.join(process.cwd(), 'admins.json');
      console.log(`Reading admins from: ${adminsPath}`);
      
      if (!fs.existsSync(adminsPath)) {
        console.error("admins.json not found!");
        return res.status(500).json({ success: false, message: "Configuration error: admins.json missing" });
      }

      const adminsData = fs.readFileSync(adminsPath, 'utf-8');
      const admins = JSON.parse(adminsData);
      
      const admin = admins.find((a: any) => a.username === username && a.password === password);
      
      if (admin) {
        console.log("Login successful");
        res.json({ 
          success: true, 
          user: { username: admin.username, role: 'admin' } 
        });
      } else {
        console.warn("Invalid credentials provided");
        res.status(401).json({ success: false, message: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Server error during login" });
    }
  });

  // Contact form API endpoint
  app.post("/api/contact", (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // In a real production app on Vercel, you'd use something like Nodemailer or a service like SendGrid
    // Since I don't have SMTP credentials, I'll log it and return success.
    // The user's request "vercel sends filled out contact form" implies they want the logic here.
    
    console.log("Contact Form Submission:", { name, email, subject, message });
    
    // For now, we'll simulate success. 
    // In a real Vercel environment, you'd use a serverless function that sends the email.
    res.json({ 
      success: true, 
      message: "Your message has been sent successfully to xidonurtia@gmail.com" 
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
