import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const incomeValues = transactions.filter(item => item.type === 'income');

    const outcomeValues = transactions.filter(item => item.type === 'outcome');

    const income = incomeValues.reduce(
      (accumulator, item) => accumulator + +item.value,
      0,
    );
    const outcome = outcomeValues.reduce(
      (accumulator, item) => accumulator + +item.value,
      0,
    );
    const total = income - outcome;
    return { income, outcome, total };
  }
}

export default TransactionsRepository;
