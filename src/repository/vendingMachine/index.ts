import { VendingMachineAttributes, VendingMachineCreationAttributes } from '../../models/vendingMachine/types';
import VendingMachine from '../../models/vendingMachine';
import BaseRepository from '../contract/baseRepository';

class VendingMachineRepository extends BaseRepository<VendingMachineAttributes, VendingMachineCreationAttributes, VendingMachine> {
  constructor() {
    super(VendingMachine);
  }

  findById(id: number): Promise<VendingMachine | null> {
    return this.findOne({ where: { id } });
  }
}

export default new VendingMachineRepository();
