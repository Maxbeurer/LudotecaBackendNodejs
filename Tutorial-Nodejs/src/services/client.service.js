import ClientModel from '../schemas/client.schema.js';
import { getGame } from './game.service.js';

export const createClient = async function(name) {
    try {
        const existingClient = await ClientModel.findOne({ name });
        if (existingClient) {
            throw Error('There is already a client with the same name');
        }
        const client = new ClientModel({ name });
        return await client.save();
    } catch (e) {
        throw Error('Error creating client');
    }
}
export const getClients = async function () {
    try {
        return await ClientModel.find().sort('name');
    } catch (e) {
        throw Error('Error fetching clients');
    }
}

export const getClient = async (id) => {
    try {
        return await ClientModel.findById(id);
    } catch (e) {
        throw Error('There is no client with that Id');
    }
}

export const updateClient = async (id, name) => {
    try {
        const client = await ClientModel.findById(id);
        if (!client) {
            throw Error('There is no client with that Id');
        }
        const existingClient = await ClientModel.findOne({name});
        if (existingClient) {
            throw Error('There is already a client with the same name');
        }   
        return await ClientModel.findByIdAndUpdate(id, {name});
    } catch (e) {
        throw Error(e);
    }
}

export const deleteClient = async (id) => {
    try {
        const client = await ClientModel.findById(id);
        if (!client) {
            throw 'There is no client with that Id';
        }
        /*const games = await getGame({category});
        if(games.length > 0) {
            throw 'There are games related to this category';
        }*/
        return await ClientModel.findByIdAndDelete(id);
    } catch (e) {
        throw Error(e);
    }
}