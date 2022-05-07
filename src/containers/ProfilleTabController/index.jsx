import React from "react";
import PurchasedBook from "../PurchasedBook";
import TransactionHistory from "../TransactionHistory";

export default function ProfileTabController({
  tabName = "purchased",
  purchasedBook,
}) {
  if (tabName === "purchased") {
    return <PurchasedBook books={purchasedBook} />;
  } else {
    return <TransactionHistory />;
  }
}
