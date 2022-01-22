import { Optional } from 'sequelize';
import { AmountMap } from 'src/libs/amount/types';

export enum VendingMachineStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export interface VendingMachineFillable {
  name: string;
  status: VendingMachineStatus
  token: string;
  amount: AmountMap;
}
export interface VendingMachineAttributes extends VendingMachineFillable {
  id: number;
}

export interface VendingMachineDTO {
  id: VendingMachineAttributes['id'];
  name: VendingMachineAttributes['name'];
  amount: VendingMachineAttributes['amount'];
}

type OptionalVendingMachineAttributes = 'id';

export interface VendingMachineCreationAttributes extends Optional<VendingMachineAttributes, OptionalVendingMachineAttributes> {
}
