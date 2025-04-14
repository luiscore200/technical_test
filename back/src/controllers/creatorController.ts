import { Request, Response } from 'express';
import * as creatorModel from '../models/creator';

export const createCreator = async (req: Request, res: Response) => {
  try {
    const CreatorData = await creatorModel.createCreator(req.body);
    res.status(200).json({
      code: 200,
      success: true,
      message: 'Creator created successfully.',
      data: CreatorData,
    });
  } catch (err: any) {
    res.status(500).json({
      code: 500,
      success: false,
      message: 'An error occurred while creating the Creator.',
    });
  }
};

export const getAllCreators = async (_: Request, res: Response) => {
  try {
    const Creators = await creatorModel.getCreators();
    res.status(200).json({
      code: 200,
      success: true,
      message: 'Creators retrieved successfully.',
      data: Creators,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      success: false,
      message: 'An error occurred while retrieving the Creators.',
    });
  }
};

export const getCreatorById = async (req: Request, res: Response) => {
  try {
    const Creator = await creatorModel.getCreatorById(req.params.id);
    if (!Creator) {
      return res.status(404).json({
        code: 404,
        success: false,
        message: `Creator with id ${req.params.id} does not exist.`,
      });
    }
    res.status(200).json({
      code: 200,
      success: true,
      message: 'Creator retrieved successfully.',
      data: Creator,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      success: false,
      message: 'An error occurred while retrieving the Creator.',
    });
  }
};

export const updateCreator = async (req: Request, res: Response) => {
  try {
    const updatedCreator = await creatorModel.updateCreator(
    req.params.id,
      req.body
    );
    res.status(200).json({
      code: 200,
      success: true,
      message: 'Creator updated successfully.',
      data: updatedCreator,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      success: false,
      message: 'An error occurred while updating the Creator.',
    });
  }
};

export const deleteCreator = async (req: Request, res: Response) => {
  try {
    const deletedCreator = await creatorModel.deleteCreator(req.params.id);
    res.status(200).json({
      code: 200,
      success: true,
      message: `Creator with id ${req.params.id} was successfully deleted.`,
      data: deletedCreator,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      success: false,
      message: 'An error occurred while trying to delete the Creator.',
    });
  }
};
