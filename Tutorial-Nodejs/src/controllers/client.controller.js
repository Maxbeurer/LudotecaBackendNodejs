import * as ClientService from '../services/client.service.js';

export const createClient = async (req, res) => {
    const { name } = req.body;
    try {
        const client = await ClientService.createClient(name);
        res.status(200).json({
            client
        });
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        });
    }
}

export const getClients = async (req, res) => {
    try {
        const clients = await ClientService.getClients();
        res.status(200).json(
            clients
        );
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        });
    }
}

export const updateClient = async (req, res) => {
    const clientId = req.params.id;
    const { name } = req.body;
    try {
        await ClientService.updateClient(clientId, name);
        res.status(200).json(1);
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        });
    }
}

export const deleteClient = async (req, res) => {
    const clientId = req.params.id;
    try {
        const deletedClient = await ClientService.deleteClient(clientId);
        res.status(200).json({
            client: deletedClient
        });
    } catch (err) {
        res.status(400).json({
            msg: err.toString()
        });
    }
}