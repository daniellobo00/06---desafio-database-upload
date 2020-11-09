/* eslint-disable @typescript-eslint/explicit-function-return-type */
export default class TransactionsPostMap {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static toDTO(transaction: any) {
    return {
      id: transaction.id,
      title: transaction.title,
      value: transaction.value,
      type: transaction.type,
      category: transaction.category,
    };
  }
}
