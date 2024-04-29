import { Request, Response, response } from 'express';
import prisma from '../models/Cliente/cliente'


// Crear nuevo cliente.
export const createCliente = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, apellido, email, telefono, direccion } = req.body

        // Validamos que se envien todos los datos.
        if (!nombre || !apellido || !email || !telefono || !direccion) {
            res.status(400).json({ message: 'Todos los campos son obligatorios' })
        }
        const cliente = await prisma.create({
            data: {
                nombre,
                apellido,
                email,
                direccion,
                telefono
            }
        })
        res.status(200).json({ cliente })
    } catch (error: any) {
        if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
            res.status(400).json({ message: 'El email ingresado ya existe' })
        }
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}


// Obtener todos clientes.
export const getAllclientes = async (req: Request, res: Response): Promise<void> => {
    try {
        const clientes = await prisma.findMany()
        res.status(200).json({ clientes })
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error, pruebe mas tarde' })
    }
}


// Obtener cliente por ID.
export const getClienteById = async (req: Request, res: Response): Promise<void> => {

    const userId = parseInt(req.params.id)

    try {
        const cliente = await prisma.findUnique({
            where: {
                id: userId
            }
        })
        if (!cliente) {
            res.status(404).json({ error: 'El cliente no fue encontrado' })
            return
        }
        res.status(200).json({ cliente })
    } catch (error: any) {
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}


// Actualizar clientes por ID.
export const updateClientes = async (req: Request, res: Response): Promise<void> => {

    const userId = parseInt(req.params.id)
    const { nombre, apellido, email, telefono, direccion } = req.body

    try {
        let dataUpdateCliente: any = { ...req.body }

        // Validamos que se envien todos los datos.
        if (!nombre || !apellido || !email || !telefono || !direccion) {
            res.status(400).json({
                message: 'Todos los campos son obligatorios'
            })
        }
        const cliente = await prisma.update({
            where: {
                id: userId
            },
            data: dataUpdateCliente
        })
        res.status(200).json({ cliente })

    } catch (error: any) {
        if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
            res.status(400).json({ error: 'El email ingresado ya existe' })
        }
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}


// Eliminar clientes por ID.
export const deleteClientes = async (req: Request, res: Response): Promise<void> => {

    const userId = parseInt(req.params.id)

    try {
        await prisma.delete({
            where: {
                id: userId
            }
        })
        res.status(200).json({
            message: 'El cliente ha sido eliminado'
        }).end()
    } catch (error: any) {
        if (error?.code === 'P2002' && error?.meta?.target?.includes('email')) {
            res.status(400).json({ error: 'El email ingresado ya existe' })
        }
        res.status(500).json({ error: 'Hubo un error, pruebe mas tarde' })
    }
}