import { users, type User, type InsertUser, type Order, type InsertOrder, orders } from "@shared/schema";
import { nanoid } from "nanoid";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Order operations
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
}

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

export const storage = new MemStorage();
