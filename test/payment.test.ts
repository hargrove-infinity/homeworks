import { paymentAPI, processPayment } from "../src/payment";

describe("processPayment", () => {
  // EXERCISE 1: Test that processPayment handles a successful payment correctly
  // without actually calling a payment processor.
  it("should handle successful payment", async () => {
    // TODO: Spy/mock paymentAPI.chargeCard
    const spyOnChargeCardMockImpl = jest
      .spyOn(paymentAPI, "chargeCard")
      .mockImplementation()
      .mockResolvedValue({
        success: true,
        transactionId: "txn_456",
        amount: 50,
      });

    /**
     * Question 1
     *
     * Do these ways of mocking do the same? Are they interchangeable?
     *
     * const spyOnChargeCardMockImpl = jest
     * .spyOn(paymentAPI, "chargeCard")
     * .mockImplementation(() => {
     *    return Promise.resolve({
     *      success: true,
     *      transactionId: "txn_456",
     *      amount: 50,
     *    });
     *  });
     *
     * const spyOnChargeCardMockImpl = jest
     *  .spyOn(paymentAPI, "chargeCard")
     *  .mockImplementation()
     *  .mockResolvedValue({
     *    success: true,
     *    transactionId: "txn_456",
     *    amount: 50,
     *  });
     *
     */

    /**
     * Question 2
     *
     * If I write this way
     *
     * const spyOnChargeCardMockImpl = jest
     *   .spyOn(paymentAPI, "chargeCard")
     *   .mockImplementation();
     *
     * then spyOnChargeCardMockImpl will return undefined
     *
     * correct?
     */

    const result = await processPayment(50, "4111111111111111");

    // TODO: Verify chargeCard was called with (50, '4111111111111111')
    expect(spyOnChargeCardMockImpl).toHaveBeenCalledWith(
      50,
      "4111111111111111"
    );

    // TODO: Verify result status is 'success'
    expect(result.status).toBe("success");

    // TODO: Verify result has transactionId 'txn_456'
    expect(result.transactionId).toBe("txn_456");

    // TODO: Restore the spy
    spyOnChargeCardMockImpl.mockRestore();
  });

  // EXERCISE 2: You want to test that processPayment handles a failed payment correctly
  // by throwing an error without actually failing a real payment
  it("should handle payment failure", async () => {
    // TODO: Spy on paymentAPI.chargeCard and mock it to reject with:
    // new Error('Insufficient funds')
    // const chargeSpy = jest.spyOn(...).mockRejectedValue(...)

    const spyOnChargeCardMockImpl = jest
      .spyOn(paymentAPI, "chargeCard")
      .mockImplementation()
      .mockRejectedValue(new Error("Insufficient funds"));

    const result = await processPayment(1000, "4111111111111111");

    // TODO: Verify chargeCard was called
    expect(spyOnChargeCardMockImpl).toHaveBeenCalled();

    // TODO: Verify result status is 'failed'
    expect(result.status).toBe("failed");

    // TODO: Verify result error is 'Insufficient funds'
    expect(result.error).toBe("Insufficient funds");

    // TODO: Restore the spy
    spyOnChargeCardMockImpl.mockRestore();
  });
});
