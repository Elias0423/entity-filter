
import { Router } from 'express';
import EntityController from '../controllers/entity.controller';
import EntityRepository from '../repositories/entity.repository';
import EntityService from '../services/entity.service';

const entityRepository = new EntityRepository();
const entityService = new EntityService(entityRepository);
const entityController = new EntityController(entityService);

const router = Router();

router.post('/filter', entityController.filterEntity());

export default router;
