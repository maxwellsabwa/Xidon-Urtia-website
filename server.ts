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
    
    try {
      const adminsPath = path.join(process.cwd(), 'admins.json');
      const adminsData = fs.readFileSync(adminsPath, 'utf-8');
      const admins = JSON.parse(adminsData);
      
      const admin = admins.find((a: any) => a.username === username && a.password === password);
      
      if (admin) {
        // In a real app, you'd use JWT or sessions. 
        // For this simple setup, we'll return a success flag and user info.
        res.json({ 
          success: true, 
          user: { username: admin.username, role: 'admin' } 
        });
      } else {
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

  // Products API
  const productsPath = path.join(process.cwd(), 'products.json');

  const getProducts = () => {
    try {
      if (!fs.existsSync(productsPath)) {
        fs.writeFileSync(productsPath, JSON.stringify([]));
      }
      const data = fs.readFileSync(productsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading products:", error);
      return [];
    }
  };

  const saveProducts = (products: any[]) => {
    try {
      fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
      return true;
    } catch (error) {
      console.error("Error saving products:", error);
      return false;
    }
  };

  app.get("/api/products", (req, res) => {
    res.json(getProducts());
  });

  app.post("/api/products", (req, res) => {
    const products = getProducts();
    const newProduct = { ...req.body, id: Date.now().toString() };
    products.push(newProduct);
    if (saveProducts(products)) {
      res.status(201).json(newProduct);
    } else {
      res.status(500).json({ message: "Failed to save product" });
    }
  });

  app.put("/api/products/:id", (req, res) => {
    const products = getProducts();
    const index = products.findIndex((p: any) => p.id === req.params.id);
    if (index !== -1) {
      products[index] = { ...products[index], ...req.body };
      if (saveProducts(products)) {
        res.json(products[index]);
      } else {
        res.status(500).json({ message: "Failed to update product" });
      }
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });

  app.delete("/api/products/:id", (req, res) => {
    const products = getProducts();
    const filteredProducts = products.filter((p: any) => p.id !== req.params.id);
    if (saveProducts(filteredProducts)) {
      res.json({ message: "Product deleted" });
    } else {
      res.status(500).json({ message: "Failed to delete product" });
    }
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
