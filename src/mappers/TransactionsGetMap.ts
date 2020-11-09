/* eslint-disable @typescript-eslint/explicit-function-return-type */
export default class TransactionsGetMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static toDTO(transactions: any) {
    return {
      id: transactions.id,
      title: transactions.title,
      value: transactions.value,
      type: transactions.type,
      category: transactions.category,
      created_at: transactions.created_at,
      updated_at: transactions.updated_at,
    };
  }
}
