import { DataTypes, Model } from 'sequelize';
import sequelize from '../../bootstrap/sequelize';
import Product from '../product';
import { VendingMachineAttributes, VendingMachineCreationAttributes, VendingMachineDTO } from './types';

import VendingMachineProduct from '../vendingMachineProduct';

class VendingMachine extends Model<VendingMachineAttributes, VendingMachineCreationAttributes> implements VendingMachineAttributes {
  declare id: VendingMachineAttributes['id'];

  declare name: VendingMachineAttributes['name'];

  declare status: VendingMachineAttributes['status'];

  declare token: VendingMachineAttributes['token'];

  declare amount: VendingMachineAttributes['amount'];

  declare getProducts: () => Promise<Product[]>;

  declare products?: Product[];

  public toDTO(): VendingMachineDTO {
    return {
      id: this.id,
      name: this.name,
      amount: this.amount,
    };
  }
}

VendingMachine.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'vending_machines',
});

VendingMachine.belongsToMany(Product, {
  through: VendingMachineProduct,
  foreignKey: 'vendingMachineId',
  otherKey: 'productId',
  as: 'products',
});

Product.belongsToMany(VendingMachine, {
  through: VendingMachineProduct,
  foreignKey: 'productId',
  otherKey: 'vendingMachineId',
  as: 'vendingMachines',
});

VendingMachineProduct.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product',
});

VendingMachineProduct.belongsTo(VendingMachine, {
  foreignKey: 'vendingMachineId',
  as: 'vendingMachine',
});

export default VendingMachine;
