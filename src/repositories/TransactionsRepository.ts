import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const transactionResponse = this.transactions;

    return transactionResponse;
  }

  public getBalance(): Balance {
    const reducer = (accumulator: number, currentValue: number): number =>
      accumulator + currentValue;

    const incomeArr = this.transactions.map(item =>
      item.type === 'income' ? item.value : 0,
    );

    const outcomeArr = this.transactions.map(item =>
      item.type === 'outcome' ? item.value : 0,
    );

    const income = incomeArr.reduce(reducer);
    const outcome = outcomeArr.reduce(reducer);

    const total = income - outcome;

    const balance: Balance = { income, outcome, total };

    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
