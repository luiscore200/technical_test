import { Router } from 'express';

// Controllers
import * as companyController from '../controllers/companyController';
import * as creatorController from '../controllers/creatorController';
import * as contentRequestController from '../controllers/contentRequestController';

const router = Router();

// Company routes
router.get('/companies', companyController.getAllCompanies);
router.get('/companies/:id', companyController.getCompany);
router.post('/companies', companyController.createCompany);
router.put('/companies/:id', companyController.updateCompany);
router.delete('/companies/:id', companyController.deleteCompany);

// Creator routes
router.get('/creators', creatorController.getAllCreators);
router.get('/creators/:id', creatorController.getCreator);
router.post('/creators', creatorController.createCreator);
router.put('/creators/:id', creatorController.updateCreator);
router.delete('/creators/:id', creatorController.deleteCreator);

// Content Request routes
router.get('/content-requests', contentRequestController.getAllContentRequests);
router.get('/content-requests/:id', contentRequestController.getContentRequest);
router.post('/content-requests', contentRequestController.createContentRequest);
router.put('/content-requests/:id', contentRequestController.updateContentRequest);
router.delete('/content-requests/:id', contentRequestController.deleteContentRequest);

export default router;
