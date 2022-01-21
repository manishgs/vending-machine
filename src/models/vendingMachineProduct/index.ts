import { DataTypes, Model } from 'sequelize';
import sequelize from '../../bootstrap/sequelize';
import { VendingMachineAttributes, VendingMachineCreationAttributes } from './types';
import Product from '../product';

class VendingMachineProduct extends Model<VendingMachineAttributes, VendingMachineCreationAttributes> implements VendingMachineAttributes {
  declare id: VendingMachineAttributes['id'];

  declare productId: VendingMachineAttributes['productId'];

  declare vendingMachineId: VendingMachineAttributes['vendingMachineId'];

  declare quantity: VendingMachineAttributes['quantity'];

  declare price: number;

  declare product: Product;

  declare getProduct: () => Promise<Product | null>;
}

VendingMachineProduct.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  vendingMachineId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'vending_machines_products',
});

export default VendingMachineProduct;
