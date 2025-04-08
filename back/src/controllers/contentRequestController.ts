import { Request, Response } from 'express';
import * as contentRequestModel from '../models/contentRequest';

export const getAllContentRequests = async (_req: Request, res: Response) => {
  const contentRequests = await contentRequestModel.getContentRequests();
  res.json(contentRequests);
};

export const getContentRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const request = await contentRequestModel.getContentRequestById(id);
  if (!request) return res.status(404).json({ message: 'Content request not found' });
  res.json(request);
};

export const createContentRequest = async (req: Request, res: Response) => {
  const newRequest = await contentRequestModel.createContentRequest(req.body);
  res.status(201).json(newRequest);
};

export const updateContentRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await contentRequestModel.updateContentRequest(id, req.body);
  res.json(updated);
};

export const deleteContentRequest = async (req: Request, res: Response) => {
  const { id } = req.params;
  await contentRequestModel.deleteContentRequest(id);
  res.status(204).send();
};
