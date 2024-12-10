import express from 'express';
const router = express.Router();
import apiRoutes from './recipe.js';

router.use('/api', apiRoutes);

export default router;