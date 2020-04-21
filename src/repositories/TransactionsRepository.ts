import Transaction from '../models/Transaction';
import {isUuid} from 'uuidv4'
interface Balance {
  income: number;
  outcome: number;
  total : number;
}
interface transactionDTO{
  title: string;
  type: "income" | "outcome";
  value: number;
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    let total_income = 0
    let total_outcome = 0
    this.transactions.map(elem => {
      if(elem.type === "income"){
        total_income+= elem.value
      }
      else{
        total_outcome+= elem.value
      }

    })
    let total = total_income - total_outcome
    const balance = {
      income : total_income,
      outcome: total_outcome,
      total
    }

    return balance
  }

   public create({title, value, type} : transactionDTO): Transaction {
      const new_transaction = new Transaction({title, value, type})

      this.transactions.push(new_transaction)
      return new_transaction
   }
}

export default TransactionsRepository;
