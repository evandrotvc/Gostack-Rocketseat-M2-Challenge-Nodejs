import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title : string;
  type : "income" | "outcome";
  value: number;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, type , value} : RequestDTO): Transaction {
    if(type === 'outcome'){
      const balance = this.transactionsRepository.getBalance()
      if(balance.total < value){
        throw Error('Insufficient Balance to outcome!')
      }
    }
   const new_transaction = this.transactionsRepository.create({title, type , value})
   return new_transaction
  }
}

export default CreateTransactionService;
