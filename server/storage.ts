import { users, type User, type InsertUser, type Order, type InsertOrder, orders } from "@shared/schema";
import { nanoid } from "nanoid";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from '@neondatabase/serverless';
import { eq } from 'drizzle-orm';

// Get the database URL from environment variables
const DATABASE_URL = process.env.DATABASE_URL as string;

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Order operations
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private orders: Map<number, Order>;
  userCurrentId: number;
  orderCurrentId: number;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.userCurrentId = 1;
    this.orderCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.orderCurrentId++;
    const timestamp = new Date();
    const orderRef = `CW-${timestamp.getFullYear()}-${nanoid(6).toUpperCase()}`;
    
    // Convert features to proper string array using map if needed
    const featuresArray: string[] = Array.isArray(insertOrder.features) ? 
      insertOrder.features.map(feature => String(feature)) : [];
    
    // Create the order with typed features
    const order: Order = { 
      id,
      name: insertOrder.name,
      email: insertOrder.email,
      phone: insertOrder.phone,
      company: insertOrder.company || null,
      videoType: insertOrder.videoType,
      videoLength: insertOrder.videoLength,
      features: featuresArray,
      fileLink: insertOrder.fileLink || null,
      notes: insertOrder.notes || null,
      totalPrice: insertOrder.totalPrice,
      createdAt: timestamp, 
      orderRef
    };
    
    this.orders.set(id, order);
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

// PostgreSQL storage implementation
export class PostgresStorage implements IStorage {
  private db;

  constructor() {
    // Create a SQL client with prepared statements
    const sql = neon(DATABASE_URL);
    this.db = drizzle(sql);
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const timestamp = new Date();
    const orderRef = `CW-${timestamp.getFullYear()}-${nanoid(6).toUpperCase()}`;
    
    // Ensure features is a proper array
    const featuresArray: string[] = Array.isArray(insertOrder.features) ? 
      insertOrder.features.map(feature => String(feature)) : [];
    
    // Create the complete order object
    const orderData = {
      name: insertOrder.name,
      email: insertOrder.email,
      phone: insertOrder.phone,
      company: insertOrder.company || null,
      videoType: insertOrder.videoType,
      videoLength: insertOrder.videoLength,
      features: featuresArray,
      fileLink: insertOrder.fileLink || null,
      notes: insertOrder.notes || null,
      totalPrice: insertOrder.totalPrice,
      orderRef
    };
    
    const result = await this.db.insert(orders).values(orderData).returning();
    return result[0];
  }

  async getOrders(): Promise<Order[]> {
    return await this.db.select().from(orders).orderBy(orders.createdAt);
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const result = await this.db.select().from(orders).where(eq(orders.id, id));
    return result.length > 0 ? result[0] : undefined;
  }
}

// Export PostgreSQL storage as the default storage mechanism
export const storage = new PostgresStorage();
