import { Router } from 'express';
import { check } from 'express-validator';
import validateFields from '../middlewares/validateFields.js';
import { getClients, createClient, deleteClient, updateClient } from '../controllers/client.controller.js';
const clientRouter = Router();

clientRouter.put('/:id', [
    check('name').not().isEmpty(),
    validateFields
], updateClient);

clientRouter.put('/', [
    check('name').not().isEmpty(),
    validateFields
], createClient);

clientRouter.get('/', getClients);
clientRouter.delete('/:id', deleteClient);

export default clientRouter;