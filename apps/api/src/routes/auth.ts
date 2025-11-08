import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '@yarnloft/db';
import { authMiddleware } from '../middleware/auth';
import { createApiResponse, asyncHandler } from '../utils/api';

const router = express.Router();

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().optional(),
  location: z.string().optional(),
  ravelryUsername: z.string().optional(),
  preferredCrafts: z.enum(['KNITTING', 'CROCHETING', 'BOTH']).default('BOTH'),
  skillLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).default('BEGINNER'),
  profileVisibility: z.enum(['PUBLIC', 'PRIVATE', 'FRIENDS_ONLY']).default('PUBLIC'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// JWT token generation
const generateToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'fallback-secret-key',
    { expiresIn: '7d' }
  );
};

// Register new user
router.post('/register', asyncHandler(async (req, res) => {
  const validatedData = registerSchema.parse(req.body);

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: validatedData.email },
  });

  if (existingUser) {
    return createApiResponse(res, 409, null, 'User with this email already exists');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(validatedData.password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: validatedData.email,
      passwordHash,
      name: validatedData.name,
      bio: validatedData.bio,
      location: validatedData.location,
      ravelryUsername: validatedData.ravelryUsername,
      preferredCrafts: validatedData.preferredCrafts,
      skillLevel: validatedData.skillLevel,
      profileVisibility: validatedData.profileVisibility,
    },
    select: {
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
      bio: true,
      location: true,
      ravelryUsername: true,
      preferredCrafts: true,
      skillLevel: true,
      profileVisibility: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Generate token
  const token = generateToken(user.id);

  createApiResponse(res, 201, {
    user,
    token,
  }, 'User registered successfully');
}));

// Login user
router.post('/login', asyncHandler(async (req, res) => {
  const validatedData = loginSchema.parse(req.body);

  // Find user
  const user = await prisma.user.findUnique({
    where: { email: validatedData.email },
  });

  if (!user || !user.passwordHash) {
    return createApiResponse(res, 401, null, 'Invalid email or password');
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(validatedData.password, user.passwordHash);

  if (!isValidPassword) {
    return createApiResponse(res, 401, null, 'Invalid email or password');
  }

  // Generate token
  const token = generateToken(user.id);

  // Return user data without sensitive information
  const userData = {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatarUrl,
    bio: user.bio,
    location: user.location,
    ravelryUsername: user.ravelryUsername,
    preferredCrafts: user.preferredCrafts,
    skillLevel: user.skillLevel,
    profileVisibility: user.profileVisibility,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  createApiResponse(res, 200, {
    user: userData,
    token,
  }, 'Login successful');
}));

// Get current user profile
router.get('/me', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user!.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
      bio: true,
      location: true,
      ravelryUsername: true,
      preferredCrafts: true,
      skillLevel: true,
      profileVisibility: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return createApiResponse(res, 404, null, 'User not found');
  }

  createApiResponse(res, 200, user, 'User profile retrieved successfully');
}));

// Update user profile
router.put('/me', authMiddleware, asyncHandler(async (req, res) => {
  const userId = req.user!.id;

  const updateSchema = z.object({
    name: z.string().min(2).optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    ravelryUsername: z.string().optional(),
    preferredCrafts: z.enum(['KNITTING', 'CROCHETING', 'BOTH']).optional(),
    skillLevel: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional(),
    profileVisibility: z.enum(['PUBLIC', 'PRIVATE', 'FRIENDS_ONLY']).optional(),
  });

  const validatedData = updateSchema.parse(req.body);

  const user = await prisma.user.update({
    where: { id: userId },
    data: validatedData,
    select: {
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
      bio: true,
      location: true,
      ravelryUsername: true,
      preferredCrafts: true,
      skillLevel: true,
      profileVisibility: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  createApiResponse(res, 200, user, 'Profile updated successfully');
}));

// Logout (client-side token removal)
router.post('/logout', authMiddleware, asyncHandler(async (req, res) => {
  createApiResponse(res, 200, null, 'Logout successful');
}));

module.exports = router;