export enum VendingMachineStatus {
  Available = 'Available',
  Unavailable = 'Unavailable',
}

export interface VendingMachineInstance {
  id: number;
  name: string;
  status: VendingMachineStatus
}
