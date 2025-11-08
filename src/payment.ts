export const paymentAPI = {
  async chargeCard(amount: number, cardNumber: string) {
    // In production, this calls a real payment processor
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (cardNumber.startsWith("4")) {
      return { success: true, transactionId: "txn_123", amount };
    }
    throw new Error("Card declined");
  },
};

export async function processPayment(amount: number, cardNumber: string) {
  try {
    const result = await paymentAPI.chargeCard(amount, cardNumber);
    return {
      status: "success",
      transactionId: result.transactionId,
      amount: result.amount,
    };
  } catch (error) {
    return {
      status: "failed",
      error:
        error && typeof error === "object" && "message" in error
          ? error.message
          : "Unknown error",
    };
  }
}
