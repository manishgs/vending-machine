import { expect } from 'chai';
import Product from '../../src/models/product';
import VendingMachine from '../../src/models/vendingMachine';
import VendingMachineRepository from '../../src/repository/vendingMachine';
import Amount from '../../src/libs/amount';
import PurchaseTransaction from '../../src/libs/transaction/purchase';
import ProductRepository from '../../src/repository/product';

describe.only('Transaction', () => {
  it('price less than recieved amount', async () => {
    const product = (await ProductRepository.findById(1)) as Product;
    const amount = new Amount({ 1: 10 });
    const vendingMachine = (await VendingMachineRepository.findById(1)) as VendingMachine;
    const txn = new PurchaseTransaction(product, amount, vendingMachine);
    expect(txn.totalRecievedAmount()).to.equal(10);
    expect(txn.isAmountEnough()).to.equal(false);
    expect(txn.isEnoughbalanceToReturn()).to.equal(true);
    expect(txn.returnAmount().total()).to.equal(0);
    expect(txn.recievedMap()).to.deep.equal(amount.toMap());
    expect(txn.vmAmount()).to.deep.equal(txn.availableAmount());
    expect(txn.vmAmount().toMap()).to.deep.equal({ 1: 110 });
  });

  it('price greater than recieved amount', async () => {
    const product = (await ProductRepository.findById(1)) as Product;
    const amount = new Amount({ 1: 50, 2: 10 });
    const vendingMachine = (await VendingMachineRepository.findById(1)) as VendingMachine;
    const txn = new PurchaseTransaction(product, amount, vendingMachine);
    expect(txn.totalRecievedAmount()).to.equal(70);
    expect(txn.isAmountEnough()).to.equal(true);
    expect(txn.isEnoughbalanceToReturn()).to.equal(true);
    expect(txn.returnAmount().total()).to.equal(70 - product.price);
    expect(txn.recievedMap()).to.deep.equal(amount.toMap());
    expect(txn.returnAmount().toMap()).to.deep.equal({ 1: 50 - product.price, 2: 10 });
    expect(txn.availableAmount().toMap()).to.deep.equal({ 1: 150, 2: 10 });
    expect(txn.vmAmount().toMap()).to.deep.equal({ 1: 100 + product.price });
  });

  it('price equal recieved amount', async () => {
    const product = (await ProductRepository.findById(1)) as Product;
    const amount = new Amount({ 1: product.price });
    const vendingMachine = (await VendingMachineRepository.findById(1)) as VendingMachine;
    const txn = new PurchaseTransaction(product, amount, vendingMachine);
    expect(txn.totalRecievedAmount()).to.equal(product.price);
    expect(txn.isAmountEnough()).to.equal(true);
    expect(txn.isEnoughbalanceToReturn()).to.equal(true);
    expect(txn.returnAmount().total()).to.equal(0);
    expect(txn.recievedMap()).to.deep.equal(amount.toMap());
    expect(txn.returnAmount().toMap()).to.deep.equal({});
    expect(txn.availableAmount().toMap()).to.deep.equal({ 1: 100 + product.price });
    expect(txn.vmAmount().toMap()).to.deep.equal({ 1: 100 + product.price });
  });
});
