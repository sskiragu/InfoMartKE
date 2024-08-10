// hooks/usePaymentContract.ts
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import PaymentAbi from '../abis/PaymentAbi.json'; // Ensure this path is correct

const paymentContractAddress = '0x8bcb29b7834C72b43dc29a770c8A257219e0E811'; // Update with your contract address

export const usePaymentContract = () => {
  const { address } = useAccount();
  const { data: hash, writeContract, isPending } = useWriteContract();

  const handlePayment = async (amount: string) => {
    try {
      if (address) {
        // Convert amount to the appropriate format
        const amountInUnits = BigInt(amount); // Adjust this based on your token's decimal places

        // Execute the contract function
        writeContract({
          address: paymentContractAddress,
          abi: PaymentAbi,
          functionName: 'pay', // Replace with your contract method name
          args: [amountInUnits], // Adjust args based on your method requirements
          // value: amountInUnits, // Uncomment if your method requires sending ether or token
        });
      } else {
        throw new Error('No account address found');
      }
    } catch (error) {
      console.error('Payment failed - usePaymentContract', error);
      throw error;
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  return {
    handlePayment,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
  };
};
