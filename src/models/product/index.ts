import { DataTypes, Model } from 'sequelize';
import sequelize from '../../bootstrap/sequelize';
import { ProductAttributes, ProductCreationAttributes, ProductDTO } from './types';

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  declare id: ProductAttributes['id'];

  declare name: ProductAttributes['name'];

  declare price: ProductAttributes['price'];

  declare quantity: number;

  declare VendingMachineProduct: any;

  public toDTO(): ProductDTO {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
    };
  }
}

Product.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'products',
});

export default Product;
