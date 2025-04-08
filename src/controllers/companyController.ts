import { Request, Response } from 'express';
import * as companyModel from '../models/company';

export const createCompany = async (req: Request, res: Response) => {
  const company = await companyModel.createCompany(req.body);
  res.status(201).json(company);
};

export const getCompanies = async (_: Request, res: Response) => {
  const companies = await companyModel.getCompanies();
  res.json(companies);
};

export const getCompanyById = async (req: Request, res: Response) => {
  const company = await companyModel.getCompanyById(Number(req.params.id));
  if (!company) return res.status(404).json({ error: 'Empresa no encontrada' });
  res.json(company);
};

export const updateCompany = async (req: Request, res: Response) => {
  const updated = await companyModel.updateCompany(Number(req.params.id), req.body);
  res.json(updated);
};

export const deleteCompany = async (req: Request, res: Response) => {
  await companyModel.deleteCompany(Number(req.params.id));
  res.status(204).send();
};
