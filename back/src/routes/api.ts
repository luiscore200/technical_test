import { Router } from 'express';
import { validateWithZod } from '../middlewares/zodValidation';



// Controllers
import * as companyController from '../controllers/companyController';
import * as creatorController from '../controllers/creatorController';
import * as contentRequestController from '../controllers/contentRequestController';
import { companySchema } from '../validators/companySchema';
import { creatorSchema } from '../validators/creatorSchema';

const router = Router();

// Company routes
router.post('/companies', validateWithZod(companySchema), companyController.createCompany);

router.get('/companies', companyController.getCompanies);
router.get('/companies/:id', companyController.getCompanyById);
router.put('/companies/:id', companyController.updateCompany);
router.delete('/companies/:id', companyController.deleteCompany);

// Creator routes
router.get('/creators',creatorController.getAllCreators);
router.get('/creators/:id', creatorController.getCreatorById);
router.post('/creators', validateWithZod(creatorSchema), creatorController.createCreator);
router.put('/creators/:id', creatorController.updateCreator);
router.delete('/creators/:id', creatorController.deleteCreator);

// Content Request routes
router.get('/content-requests', contentRequestController.getAllContentRequests);
router.get('/content-requests/:id', contentRequestController.getContentRequest);
router.post('/content-requests', contentRequestController.createContentRequest);
router.put('/content-requests/:id', contentRequestController.updateContentRequest);
router.delete('/content-requests/:id', contentRequestController.deleteContentRequest);

export default router;
