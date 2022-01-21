import { Optional } from 'sequelize';

export interface ProductFillable {
  name: string;
  price: number;
}

export interface ProductAttributes extends ProductFillable {
  id: number;
}

export interface ProductDTO {
  id: ProductAttributes['id'];
  name: ProductAttributes['name'];
  price: ProductAttributes['price'];
  quantity?: number;
}

type OptionalProductAttributes = 'id';

export interface ProductCreationAttributes extends Optional<ProductAttributes, OptionalProductAttributes> {
}
