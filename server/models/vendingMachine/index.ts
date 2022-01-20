import { VendingMachineInstance } from './type';
import VendingMachineList from './data.json';

class VendingMachine {
  async findById(id: number): Promise<VendingMachineInstance | undefined> {
    return (await this.find()).find((vendingMachine: VendingMachineInstance) => vendingMachine.id === id);
  }

  find(): Promise<VendingMachineInstance[]> {
    return new Promise((resolve) => {
      resolve(VendingMachineList as VendingMachineInstance[]);
    });
  }
}

export default new VendingMachine();
