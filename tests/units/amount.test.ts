import { expect } from 'chai';
import { AmountMap } from '../../src/libs/amount/types';
import Amount from '../../src/libs/amount';

describe.only('Amount', () => {
  describe('Amount', () => {
    it('Amount total', async () => {
      const aMap: AmountMap = { 1: 198, 2: 232, 10: 123 };
      let total: number = 0;
      for (const key of Object.keys(aMap)) {
        total += aMap[key] * parseInt(key, 10);
      }
      const amount = new Amount(aMap);
      expect(amount.total()).to.be.equal(total);
      expect(amount.toMap()).to.deep.equal(aMap);
      expect(amount.denominations()).to.deep.equal(['10', '2', '1']);
    });
  });
});
