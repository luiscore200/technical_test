import { Request, Response } from 'express';
import * as creatorModel from '../models/creator';

export const getAllCreators = async (_req: Request, res: Response) => {
  const creators = await creatorModel.getCreators();
  res.json(creators);
};

export const getCreator = async (req: Request, res: Response) => {
  const { id } = req.params;
  const creator = await creatorModel.getCreatorById(id);
  if (!creator) return res.status(404).json({ message: 'Creator not found' });
  res.json(creator);
};

export const createCreator = async (req: Request, res: Response) => {
  const newCreator = await creatorModel.createCreator(req.body);
  res.status(201).json(newCreator);
};

export const updateCreator = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await creatorModel.updateCreator(id, req.body);
  res.json(updated);
};

export const deleteCreator = async (req: Request, res: Response) => {
  const { id } = req.params;
  await creatorModel.deleteCreator(id);
  res.status(204).send();
};
