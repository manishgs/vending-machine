import { Optional } from 'sequelize';

export interface VendingMachineProductFillable {
  productId: number;
  vendingMachineId: number
  quantity: number;
}

export interface VendingMachineAttributes extends VendingMachineProductFillable {
  id: number;
}

type OptionalVendingMachineAttributes = 'id';

export interface VendingMachineCreationAttributes extends Optional<VendingMachineAttributes, OptionalVendingMachineAttributes> {
}
