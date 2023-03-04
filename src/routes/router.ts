import { Router } from 'express';

import entities from './entity.routes';

const router = Router();
const path = '/api/v1/';
router.use(`${path}entities`, entities);

// Not Found
router.use((req, res) => {
  res.status(404).json({ message: 'Endpoint no encontrado. :(', data: null });
});

export default router;
