import { Request, Response } from 'express';
import * as companyModel from '../models/company';

export const getAllCompanies = async (_req: Request, res: Response) => {
  const companies = await companyModel.getCompanies();
  res.json(companies);
};

export const getCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await companyModel.getCompanyById(Number(id));
  if (!company) return res.status(404).json({ message: 'Company not found' });
  res.json(company);
};

export const createCompany = async (req: Request, res: Response) => {
  const newCompany = await companyModel.createCompany(req.body);
  res.status(201).json(newCompany);
};

export const updateCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await companyModel.updateCompany(Number(id), req.body);
  res.json(updated);
};

export const deleteCompany = async (req: Request, res: Response) => {
  const { id } = req.params;
  await companyModel.deleteCompany(Number(id));
  res.status(204).send();
};
