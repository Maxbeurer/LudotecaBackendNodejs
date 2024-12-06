import { Router } from 'express';
import { check } from 'express-validator';
import validateFields from '../middlewares/validateFields.js';
import { createLoan, deleteLoan, getLoans, getLoansPageable } from '../controllers/loan.controller.js';
const loanRouter = Router();

loanRouter.put('/', [
    check('game.id').not().isEmpty(),
    check('client.id').not().isEmpty(),
    check('startDate').not().isEmpty(),
    check('endDate').not().isEmpty(),
    validateFields
], createLoan);


loanRouter.get('/', getLoans);
loanRouter.delete('/:id', deleteLoan);

loanRouter.post('/', [
    check('pageable').not().isEmpty(),
    check('pageable.pageSize').not().isEmpty(),
    check('pageable.pageNumber').not().isEmpty(),
    validateFields
], getLoansPageable)

export default loanRouter;