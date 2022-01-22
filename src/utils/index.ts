export const isAmount = (val: string) => {
  const amount = parseInt(val, 10);
  // not a number
  if (Number.isNaN(amount)) return false;
  // decimal
  if (amount % 1 !== 0) return false;

  // not a positive number
  if (amount < 1) return false;

  return true;
};
