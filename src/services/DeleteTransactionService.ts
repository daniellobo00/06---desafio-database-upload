import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  id: string;
}
class DeleteTransactionService {
  public async execute({ id }: Request): Promise<Transaction> {
    const transactionsCustomRepository = getCustomRepository(
      TransactionsRepository,
    );

    const transaction = await transactionsCustomRepository.findOne({
      where: { id },
    });
    if (transaction) {
      await transactionsCustomRepository.delete(id);
    } else {
      throw new AppError('Transaction dont exist', 401);
    }

    return transaction;
  }
}

export default DeleteTransactionService;
