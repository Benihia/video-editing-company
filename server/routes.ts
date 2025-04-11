import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadDir = path.join(import.meta.dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage_config = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ 
  storage: storage_config,
  limits: { fileSize: 1000 * 1024 * 1024 }, // 1GB max file size
  fileFilter: (req, file, cb) => {
    // Accept video files and images
    const validTypes = [
      'video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-ms-wmv',
      'image/jpeg', 'image/png', 'image/gif', 'application/zip'
    ];
    if (validTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only video, image, and zip files are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post('/api/orders', async (req: Request, res: Response) => {
    try {
      const orderData = req.body;
      const parseResult = insertOrderSchema.safeParse(orderData);
      
      if (!parseResult.success) {
        return res.status(400).json({ 
          message: 'Invalid order data', 
          errors: parseResult.error.format() 
        });
      }
      
      const order = await storage.createOrder(parseResult.data);
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ message: 'Failed to create order' });
    }
  });
  
  app.get('/api/orders', async (req: Request, res: Response) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  });
  
  app.get('/api/orders/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid order ID' });
      }
      
      const order = await storage.getOrder(id);
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      res.json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ message: 'Failed to fetch order' });
    }
  });
  
  // File upload endpoint
  app.post('/api/upload', upload.single('file'), (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      res.json({ 
        message: 'File uploaded successfully',
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Failed to upload file' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
