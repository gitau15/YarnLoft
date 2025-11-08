import { Response } from 'express';

export const createApiResponse = (
  res: Response,
  statusCode: number,
  data: any,
  message?: string
) => {
  const response: any = {
    success: statusCode < 400,
  };

  if (data !== null && data !== undefined) {
    response.data = data;
  }

  if (message) {
    response.message = message;
  }

  if (statusCode >= 400) {
    response.error = data || 'Something went wrong';
    delete response.data;
  }

  return res.status(statusCode).json(response);
};

export const asyncHandler = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export const createPaginationResponse = (
  data: any[],
  page: number,
  limit: number,
  total: number
) => {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};