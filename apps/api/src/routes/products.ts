import express from 'express';
import { z } from 'zod';
import { prisma } from '@yarnloft/db';
import { optionalAuthMiddleware } from '../middleware/auth';
import { createApiResponse, asyncHandler, createPaginationResponse } from '../utils/api';

const router = express.Router();

// Query schema for filtering products
const productsQuerySchema = z.object({
  page: z.string().optional().default('1').transform(Number),
  limit: z.string().optional().default('20').transform(Number),
  search: z.string().optional(),
  brand: z.string().optional(),
  weightCategory: z.string().optional().transform(val => val?.split(',')),
  fiberContent: z.string().optional(),
  minPrice: z.string().optional().transform(Number),
  maxPrice: z.string().optional().transform(Number),
  inStock: z.string().optional().transform(val => val === 'true'),
  sortBy: z.enum(['name', 'price', 'createdAt']).optional().default('name'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});

// Get all products with filtering and pagination
router.get('/', optionalAuthMiddleware, asyncHandler(async (req, res) => {
  const query = productsQuerySchema.parse(req.query);
  const { page, limit, skip } = {
    page: query.page,
    limit: Math.min(query.limit, 100), // Cap at 100 items per page
    skip: (query.page - 1) * query.limit,
  };

  // Build where clause
  const where: any = {
    isActive: true,
  };

  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: 'insensitive' } },
      { brand: { contains: query.search, mode: 'insensitive' } },
      { colorway: { contains: query.search, mode: 'insensitive' } },
      { description: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  if (query.brand) {
    where.brand = { contains: query.brand, mode: 'insensitive' };
  }

  if (query.weightCategory && query.weightCategory.length > 0) {
    where.weightCategory = { in: query.weightCategory };
  }

  if (query.fiberContent) {
    where.fiberContent = { contains: query.fiberContent, mode: 'insensitive' };
  }

  if (query.minPrice || query.maxPrice) {
    where.price = {};
    if (query.minPrice) where.price.gte = query.minPrice;
    if (query.maxPrice) where.price.lte = query.maxPrice;
  }

  if (query.inStock !== undefined) {
    if (query.inStock) {
      where.stockQuantity = { gt: 0 };
    } else {
      where.stockQuantity = { lte: 0 };
    }
  }

  // Build order by clause
  const orderBy: any = {};
  orderBy[query.sortBy] = query.sortOrder;

  // Get total count
  const total = await prisma.product.count({ where });

  // Get products
  const products = await prisma.product.findMany({
    where,
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
    },
    orderBy,
    skip,
    take: limit,
  });

  createApiResponse(res, 200, createPaginationResponse(products, page, limit, total));
}));

// Get single product by ID
router.get('/:id', optionalAuthMiddleware, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id, isActive: true },
    include: {
      images: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!product) {
    return createApiResponse(res, 404, null, 'Product not found');
  }

  createApiResponse(res, 200, product);
}));

// Get product categories (weight categories)
router.get('/categories/list', asyncHandler(async (req, res) => {
  const categories = await prisma.product.groupBy({
    by: ['weightCategory'],
    where: {
      isActive: true,
      stockQuantity: { gt: 0 },
    },
    _count: {
      weightCategory: true,
    },
  });

  const categoryList = categories.map(cat => ({
    name: cat.weightCategory,
    count: cat._count.weightCategory,
  }));

  createApiResponse(res, 200, categoryList);
}));

// Get product brands
router.get('/brands/list', asyncHandler(async (req, res) => {
  const brands = await prisma.product.groupBy({
    by: ['brand'],
    where: {
      isActive: true,
      stockQuantity: { gt: 0 },
    },
    _count: {
      brand: true,
    },
  });

  const brandList = brands.map(brand => ({
    name: brand.brand,
    count: brand._count.brand,
  }));

  // Sort alphabetically
  brandList.sort((a, b) => a.name.localeCompare(b.name));

  createApiResponse(res, 200, brandList);
}));

// Search products
router.get('/search/query', optionalAuthMiddleware, asyncHandler(async (req, res) => {
  const { q: query } = req.query;

  if (!query || typeof query !== 'string') {
    return createApiResponse(res, 400, null, 'Search query is required');
  }

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { brand: { contains: query, mode: 'insensitive' } },
        { colorway: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { fiberContent: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: {
      images: {
        orderBy: { order: 'asc' },
        take: 1, // Only get main image for search results
      },
    },
    take: 20, // Limit search results
  });

  createApiResponse(res, 200, products);
}));

module.exports = router;