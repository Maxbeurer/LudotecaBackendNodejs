import LoanModel from '../schemas/loan.schema.js';
import mongoose from 'mongoose';

export const getLoans = async () => {
    try {
        return await LoanModel.find().sort('id')
        .populate('game', 'title')
        .populate('client', 'name');
    } catch (e) {
        throw Error('Error fetching loans');
    }
}
export const getLoan = async (field) => {
    try {
        return await LoanModel.find(field);
    } catch (e) {
        throw Error('Error fetching loans');
    }
}

export const createLoan = async (data) => {
    const { game, client, startDate, endDate } = data;
    console.log("Creating Loan with data:", data);
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
        throw new Error('Invalid date format for startDate or endDate.');
    }
    console.log("Parsed startDate:", parsedStartDate);
    console.log("Parsed endDate:", parsedEndDate);
    console.log("Checking overlapping loans for game...");
    try {
        const overlappingLoans = await LoanModel.find({
            game: new mongoose.Types.ObjectId(game.id),
            $or: [
                { startDate: { $lte: parsedEndDate }, endDate: { $gte: parsedStartDate } },
            ],
        });
        console.log("Overlapping loans result:", overlappingLoans);
        if (overlappingLoans.length > 0) {
            throw new Error("El juego ya está prestado en el rango de fechas especificado.");
        }
    } catch (error) {
        console.error("Error during overlapping loans query:", error);
        throw error;
    }

    console.log("Checking client loans...");
    try {
        const clientLoans = await LoanModel.find({
            client: new mongoose.Types.ObjectId(client.id),
            $or: [
                { startDate: { $lte: parsedEndDate }, endDate: { $gte: parsedStartDate } },
            ],
        });
        console.log("Client loans result:", clientLoans);
        if (clientLoans.length >= 2) {
            throw new Error("El cliente no puede tener más de 2 préstamos en el mismo rango de fechas.");
        }
    } catch (error) {
        console.error("Error during client loans query:", error);
        throw error;
    }

    console.log("Saving loan...");
    try {
        const loan = new LoanModel({ 
            game:data.game.id,
            client:data.client.id, 
            startDate:data.startDate,
            endDate:data.endDate
             });
        return await loan.save();
    } catch (e) {
        throw Error('Error creating loan');
    }
}

export const deleteLoan = async (id) => {
    try {
        const loan = await LoanModel.findById(id);
        if (!loan) {
            throw Error('There is no loan with that Id');
        }
        return await LoanModel.findByIdAndDelete(id);
    } catch (e) {
        throw Error(e);
    }
}

export const getLoansPageable = async (page, limit, sort, idGame, idClient, dateString) => {
    const sortObj = {
        [sort?.property || 'id']: sort?.direction === 'DESC' ? -1 : 1
    };
    const filter = {};

    if (idGame) {
        filter.game = idGame;
    }

    if (idClient) {
        filter.client = idClient;
    }

    if (dateString) {
        const targetDate = new Date(dateString); 
        filter.startDate = { $lte: targetDate }; // startDate <= date
        filter.endDate = { $gte: targetDate };   // endDate >= date
    }
    try {
        return await LoanModel.paginate(filter, {
            page: parseInt(page) + 1,
            limit,
            sort: sortObj,
            populate: [
                { path: 'game', select: 'title' },
                { path: 'client', select: 'name' },
            ],
        });
    } catch (e) {
        throw Error('Error fetching loans page');
    }    
}