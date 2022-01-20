import { VendingMachineInstance, VendingMachineStatus } from './type';
import VendingMachineList from './data.json';

class VendingMachine {
  find(): Promise<VendingMachineInstance[]> {
    return new Promise((resolve) => {
      resolve(VendingMachineList as VendingMachineInstance[]);
    });
  }

  async verifyToken(token: string): Promise<VendingMachineInstance | null> {
    const machines = await this.find();
    for (const machine of machines) {
      if (token === machine.token && machine.status === VendingMachineStatus.Available) {
        return machine;
      }
    }
    return null;
  }
}

export default new VendingMachine();
