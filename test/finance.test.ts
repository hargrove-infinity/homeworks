import {
  accountBalance,
  calculatePrice,
  finance,
  processCheckout,
} from "../src/finance";

// EXERCISE 1: Use jest.spyOn()

// calculatePrice doesn't change any state or have any external risk
describe("calculatePrice", () => {
  it("should calculate tax", () => {
    // TODO: create the spy
    const spyOnCalculateTax = jest.spyOn(finance, "calculateTax");

    const result = calculatePrice(100, 0.1);

    // TODO: Verify calculateTax was called with the arguments
    expect(spyOnCalculateTax).toHaveBeenCalledWith(100, 0.1);

    // TODO: Verify total is 110
    expect(result.total).toBe(110);

    // TODO: Restore the spy
    spyOnCalculateTax.mockRestore();
  });
});

// EXERCISE 2: Use jest.spyOn().mockImplementation()
// processCheckout is dangerous, it modifies balance
describe("processCheckout", () => {
  it("should withdraw from balance", () => {
    // TODO: Spy on finance.withdraw and replace with mock implementation

    // As I understand to complete check - Verify return value is 49890
    // I need to mock implementation so that it returns 49890
    // As I understand I can do this in 2 ways:
    //
    // - pass a function to the .mockImplementation()
    // const spyOnWithdrawMockImpl = jest
    //  .spyOn(finance, "withdraw")
    //  .mockImplementation(() => 49800);
    //
    // - utilize .mockReturnValue()
    // const spyOnWithdrawMockImpl = jest
    //   .spyOn(finance, "withdraw")
    //   .mockImplementation();
    //
    // spyOnWithdrawMockImpl.mockReturnValue(49890);

    const spyOnWithdrawMockImpl = jest
      .spyOn(finance, "withdraw")
      .mockImplementation();

    spyOnWithdrawMockImpl.mockReturnValue(49890);

    const result = processCheckout(100, 0.1);

    // TODO: Verify withdraw was called with 110
    expect(spyOnWithdrawMockImpl).toHaveBeenCalledWith(110);

    console.log("result", result);

    // TODO: Verify return value is 49890
    expect(result.newBalance).toBe(49890);

    // TODO: Verify real accountBalance is unchanged
    expect(accountBalance).toBe(50000);

    // TODO: Restore the spy
    spyOnWithdrawMockImpl.mockRestore();
  });
});
