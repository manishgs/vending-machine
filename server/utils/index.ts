export const isAmount = (val: string | number) => {
  const amount = Number(val);
  // not a number
  if (Number.isNaN(amount)) return false;
  // decimal
  if (amount % 1 !== 0) return false;

  // not a positive number
  if (amount < 1) return false;

  return true;
};
