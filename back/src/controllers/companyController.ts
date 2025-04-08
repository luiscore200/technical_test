import { Request, Response } from 'express';
import * as companyModel from '../models/company';

export const createCompany = async (req: Request, res: Response) => {
  try {
    const companyData = await companyModel.createCompany(req.body);
    res.status(200).json({
      code: 200,
      success: true,
      message: 'Company created successfully.',
      data: companyData,
    });
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      success: false,
      message: 'An error occurred while creating the company.',
    });
  }
};

export const getCompanies = async (_: Request, res: Response) => {
  try {
    const companies = await companyModel.getCompanies();
    res.status(200).json({
      code: 200,
      success: true,
      message: 'Companies retrieved successfully.',
      data: companies,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      success: false,
      message: 'An error occurred while retrieving the companies.',
    });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const company = await companyModel.getCompanyById(Number(req.params.id));
    if (!company) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: `Company with id ${req.params.id} does not exist.`,
      });
    }
    res.status(200).json({
      code: 200,
      success: true,
      message: 'Company retrieved successfully.',
      data: company,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      success: false,
      message: 'An error occurred while retrieving the company.',
    });
  }
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const updatedCompany = await companyModel.updateCompany(
      Number(req.params.id),
      req.body
    );
    res.status(200).json({
      code: 200,
      success: true,
      message: 'Company updated successfully.',
      data: updatedCompany,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      success: false,
      message: 'An error occurred while updating the company.',
    });
  }
};

export const deleteCompany = async (req: Request, res: Response) => {
  try {
    const deletedCompany = await companyModel.deleteCompany(Number(req.params.id));
    res.status(200).json({
      code: 200,
      success: true,
      message: `Company with id ${req.params.id} was successfully deleted.`,
      data: deletedCompany,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      success: false,
      message: 'An error occurred while trying to delete the company.',
    });
  }
};
