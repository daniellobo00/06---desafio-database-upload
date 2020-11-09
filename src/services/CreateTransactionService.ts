// import AppError from '../errors/AppError';
import { getRepository, getCustomRepository } from 'typeorm';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

interface Response {
  id: string;
  title: string;
  type: string;
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Response> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const balanceTotal = (await transactionsRepository.getBalance()).total;

    if (type === 'outcome' && value > balanceTotal) {
      throw new AppError('Insuficient funds', 400);
    }

    const categoryExists = await categoryRepository.findOne({
      where: { title: category },
    });

    const transaction = await transactionsRepository.create({
      title,
      value,
      type,
    });

    if (categoryExists) {
      transaction.category_id = categoryExists.id;
    } else {
      const newCategory = await categoryRepository.create({
        title: category,
      });
      const categoryCreated = await categoryRepository.save(newCategory);

      transaction.category_id = categoryCreated.id;
    }

    const transactionCreated = await transactionsRepository.save(transaction);

    const transactionID = transactionCreated.id;

    return { id: transactionID, title, value, type, category };
  }
}

export default CreateTransactionService;
