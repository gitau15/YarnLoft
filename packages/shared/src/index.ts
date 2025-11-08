// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
  bio?: string | null;
  location?: string | null;
  ravelryUsername?: string | null;
  preferredCrafts: PreferredCrafts;
  skillLevel: SkillLevel;
  profileVisibility: ProfileVisibility;
  createdAt: Date;
  updatedAt: Date;
}

export enum PreferredCrafts {
  KNITTING = 'knitting',
  CROCHETING = 'crocheting',
  BOTH = 'both',
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

export enum ProfileVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  FRIENDS_ONLY = 'friends_only',
}

// Product Types
export interface Product {
  id: string;
  name: string;
  brand: string;
  colorway: string;
  description: string;
  price: number;
  weightCategory: YarnWeight;
  fiberContent: string;
  yardage: number;
  meters: number;
  gauge: string;
  needleSize: string;
  careInstructions: string;
  stockQuantity: number;
  lowStockThreshold: number;
  isActive: boolean;
  images: ProductImage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  productId: string;
  url: string;
  alt: string;
  isMain: boolean;
  order: number;
}

export enum YarnWeight {
  LACE = 'lace',
  FINGERING = 'fingering',
  SPORT = 'sport',
  DK = 'dk',
  WORSTED = 'worsted',
  BULKY = 'bulky',
  SUPER_BULKY = 'super_bulky',
}

// Stash Types
export interface StashItem {
  id: string;
  userId: string;
  productId?: string | null;
  customName?: string | null;
  quantity: number;
  quantityUnit: QuantityUnit;
  purchaseDate?: Date | null;
  purchasePrice?: number | null;
  purchaseLocation?: string | null;
  storageLocation?: string | null;
  dyeLot?: string | null;
  notes?: string | null;
  photos: StashItemPhoto[];
  createdAt: Date;
  updatedAt: Date;
}

export interface StashItemPhoto {
  id: string;
  stashItemId: string;
  url: string;
  alt: string;
  order: number;
}

export enum QuantityUnit {
  SKEINS = 'skeins',
  YARDS = 'yards',
  METERS = 'meters',
  GRAMS = 'grams',
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentId?: string | null;
  items: OrderItem[];
  shippedAt?: Date | null;
  deliveredAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum PaymentMethod {
  STRIPE = 'stripe',
  DARAJA = 'daraja',
}

export interface Address {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Pattern Types
export interface Pattern {
  id: string;
  name: string;
  designer: string;
  description: string;
  difficultyLevel: SkillLevel;
  price: number;
  isFree: boolean;
  patternType: PatternType;
  requiredYarnWeight?: string | null;
  requiredYarnAmount?: string | null;
  gauge?: string | null;
  needleSize?: string | null;
  downloadUrl?: string | null;
  coverImageUrl: string;
  images: PatternImage[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PatternImage {
  id: string;
  patternId: string;
  url: string;
  alt: string;
  order: number;
}

export enum PatternType {
  KNITTING = 'knitting',
  CROCHETING = 'crocheting',
  BOTH = 'both',
}

// Project Types
export interface Project {
  id: string;
  userId: string;
  patternId?: string | null;
  title: string;
  description: string;
  status: ProjectStatus;
  startedAt?: Date | null;
  finishedAt?: Date | null;
  photos: ProjectPhoto[];
  notes?: string | null;
  modifications?: string | null;
  usedStashItems: string[];
  likesCount: number;
  isPublic: boolean;
  user: User;
  pattern?: Pattern | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectPhoto {
  id: string;
  projectId: string;
  url: string;
  alt: string;
  order: number;
}

export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  FINISHED = 'finished',
  HIBERNATING = 'hibernating',
}

// Shopping Cart Types
export interface Cart {
  id: string;
  userId?: string | null;
  items: CartItem[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  product: Product;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface CreateStashItemInput {
  productId?: string;
  customName?: string;
  quantity: number;
  quantityUnit: QuantityUnit;
  purchaseDate?: Date;
  purchasePrice?: number;
  purchaseLocation?: string;
  storageLocation?: string;
  dyeLot?: string;
  notes?: string;
}

export interface UpdateStashItemInput {
  customName?: string;
  quantity?: number;
  quantityUnit?: QuantityUnit;
  purchaseDate?: Date;
  purchasePrice?: number;
  purchaseLocation?: string;
  storageLocation?: string;
  dyeLot?: string;
  notes?: string;
}

export interface CreateProjectInput {
  patternId?: string;
  title: string;
  description: string;
  status: ProjectStatus;
  startedAt?: Date;
  notes?: string;
  modifications?: string;
  usedStashItems: string[];
  isPublic: boolean;
}

export interface UpdateProjectInput {
  title?: string;
  description?: string;
  status?: ProjectStatus;
  startedAt?: Date;
  finishedAt?: Date;
  notes?: string;
  modifications?: string;
  usedStashItems?: string[];
  isPublic?: boolean;
}

// Filter Types
export interface ProductFilters {
  search?: string;
  brand?: string;
  weightCategory?: YarnWeight[];
  fiberContent?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: 'name' | 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface PatternFilters {
  search?: string;
  designer?: string;
  difficultyLevel?: SkillLevel[];
  patternType?: PatternType[];
  isFree?: boolean;
  sortBy?: 'name' | 'difficulty' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ProjectFilters {
  search?: string;
  userId?: string;
  status?: ProjectStatus[];
  isPublic?: boolean;
  sortBy?: 'createdAt' | 'likesCount' | 'title';
  sortOrder?: 'asc' | 'desc';
}

// Zod Schemas
export { z } from 'zod';