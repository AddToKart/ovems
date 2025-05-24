import { pool } from "../config/database";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import bcrypt from "bcryptjs";

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  created_at?: Date;
  updated_at?: Date;
}

export class UserModel {
  static async createTable(): Promise<void> {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await pool.execute(query);
  }

  static async create(userData: Omit<User, "id">): Promise<number> {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const query = `
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      userData.username,
      userData.email,
      hashedPassword,
      userData.role,
    ]);
    return result.insertId;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.execute<RowDataPacket[]>(query, [email]);
    return rows.length > 0 ? (rows[0] as User) : null;
  }

  static async findById(id: number): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
    return rows.length > 0 ? (rows[0] as User) : null;
  }

  static async findAll(): Promise<User[]> {
    const query =
      "SELECT id, username, email, role, created_at, updated_at FROM users";
    const [rows] = await pool.execute<RowDataPacket[]>(query);
    return rows as User[];
  }

  static async updateById(
    id: number,
    updates: Partial<User>
  ): Promise<boolean> {
    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updates);
    const query = `UPDATE users SET ${fields} WHERE id = ?`;
    const [result] = await pool.execute<ResultSetHeader>(query, [
      ...values,
      id,
    ]);
    return result.affectedRows > 0;
  }

  static async deleteById(id: number): Promise<boolean> {
    const query = "DELETE FROM users WHERE id = ?";
    const [result] = await pool.execute<ResultSetHeader>(query, [id]);
    return result.affectedRows > 0;
  }

  static async verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
