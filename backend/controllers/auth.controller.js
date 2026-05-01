import prisma from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../services/token.service.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, adminSecret } = req.body;

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: "User already exists" });

    // 1. PROFESSIONAL ROLE LOGIC
    const userCount = await prisma.user.count();
    const isFirstUser = userCount === 0;
    
    // Check secret key from .env (e.g., ADMIN_SECRET_KEY=Raj_TaskFlow_2026)
    const hasSecretKey = adminSecret === process.env.ADMIN_SECRET_KEY;

    const assignedRole = (isFirstUser || hasSecretKey) ? "ADMIN" : "MEMBER";

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: { 
        name, 
        email, 
        password: hashed,
        role: assignedRole // Now properly assigned
      },
    });

    const token = generateToken(user);

    // Don't send the hashed password back to the client
    const { password: _, ...userData } = user;
    res.json({ user: userData, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    // CRITICAL: Send the role so the frontend can save it
    res.json({ 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }, 
      token 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Admin needs this to assign tasks to specific people
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true }
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};