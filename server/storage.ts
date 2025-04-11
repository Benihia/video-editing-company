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
    
    const order: Order = { 
      ...insertOrder, 
      id, 
      createdAt: timestamp, 
      orderRef,
      company: insertOrder.company || null,
      fileLink: insertOrder.fileLink || null,
      notes: insertOrder.notes || null
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
