import { DataTypes, Model } from 'sequelize';
import sequelize from '../../bootstrap/sequelize';
import { TransactionAttributes, TransactionCreationAttributes, TransactionDTO } from './types';

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  declare id: TransactionAttributes['id'];

  declare type: TransactionAttributes['type'];

  declare vendingMachineId: TransactionAttributes['vendingMachineId'];

  declare productId: TransactionAttributes['productId'];

  declare price: TransactionAttributes['price'];

  declare quantity: TransactionAttributes['quantity'];

  declare receive: TransactionAttributes['receive'];

  declare return: TransactionAttributes['return'];

  declare readonly createdAt: TransactionAttributes['createdAt'];

  public toDTO(): TransactionDTO {
    return {
      id: this.id,
      type: this.type,
      price: this.price,
      quantity: this.quantity,
      receive: this.receive,
      return: this.return,
      createdAt: this.createdAt,
    };
  }
}

Transaction.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vendingMachineId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  receive: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  return: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'transactions',
});

export default Transaction;
