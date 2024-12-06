import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { config } from 'dotenv';
import categoryRouter from './src/routes/category.routes.js';
import authorRouter from './src/routes/author.routes.js';
import gameRouter from './src/routes/game.routes.js';
import clientRouter from './src/routes/client.routes.js';
import loanRouter from './src/routes/loan.routes.js';
config();
connectDB(process.env.MONGODB_URL);
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use('/category', categoryRouter);
app.use('/author', authorRouter);
app.use('/game', gameRouter);
app.use('/client', clientRouter);
app.use('/loan', loanRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});