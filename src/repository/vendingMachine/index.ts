import { VendingMachineAttributes, VendingMachineCreationAttributes } from '../../models/vendingMachine/types';
import VendingMachine from '../../models/vendingMachine';
import BaseRepository from '../contract/baseRepository';

class VendingMachineRepository extends BaseRepository<VendingMachineAttributes, VendingMachineCreationAttributes, VendingMachine> {
  constructor() {
    super(VendingMachine);
  }
}

export default new VendingMachineRepository();
