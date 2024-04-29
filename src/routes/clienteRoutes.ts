import express from 'express';
import { createCliente, deleteClientes, getAllclientes, getClienteById, updateClientes } from '../controllers/ClienteController';

const router = express.Router()

router.post('/', createCliente)
router.get('/', getAllclientes)
router.get('/:id', getClienteById)
router.put('/:id', updateClientes)
router.delete('/:id', deleteClientes)

export default router;


