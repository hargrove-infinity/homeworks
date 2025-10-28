export let accountBalance = 50000;

export const finance = {
  calculateTax(amount: number, rate: number) {
    return amount * rate;
  },

  withdraw(amount: number) {
    accountBalance -= amount;
    return accountBalance;
  },
};

export function calculatePrice(price: number, taxRate: number) {
  const tax = finance.calculateTax(price, taxRate);
  const total = price + tax;

  return { price, tax, total };
}

export function processCheckout(price: number, taxRate: number) {
  const priceInfo = calculatePrice(price, taxRate);
  const newBalance = finance.withdraw(priceInfo.total);

  return { ...priceInfo, newBalance };
}
