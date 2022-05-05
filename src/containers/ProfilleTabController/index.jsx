import React from "react";
import PurchasedBook from "../PurchasedBook";
import TransactionHistory from "../TransactionHistory";

export default function ProfileTabController({ tabName = "purchased" }) {
  if (tabName === "purchased") {
    return <PurchasedBook />;
  } else {
    return <TransactionHistory />;
  }
}
