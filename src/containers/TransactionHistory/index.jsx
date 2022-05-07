import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { TransactionHistoryItem } from "../../components";
import API from "../../services";

export default function TransactionHistory() {
  const getTransaction = async () => {
    const { data } = await API.get("/transactions");

    return data?.data?.transactions;
  };

  const { data } = useQuery("transactionsChace", getTransaction, {
    onError: (err) => {
      const message = err?.response?.data?.message || err?.message;
      toast.error(message);
    },
  });

  return (
    <div>
      <h3 className="mb-4">My Transactions</h3>
      {data?.length <= 0 && (
        <h2 className="text-center mt-5"> You Dont Have Transaction </h2>
      )}
      {data?.map((transaction) => (
        <TransactionHistoryItem
          transaction={transaction}
          key={transaction?.id}
        />
      ))}
    </div>
  );
}
