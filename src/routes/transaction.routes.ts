import { Router } from 'express';

 import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

 const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all()
    const balance = transactionsRepository.getBalance()
    return response.json({transactions , balance})
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
      const { title , value , type} = request.body

      const new_service = new CreateTransactionService(transactionsRepository)

      const new_transaction = new_service.execute({title, value , type})

      return response.json(new_transaction)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
