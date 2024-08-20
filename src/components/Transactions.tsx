import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import style from "./transactions.module.css";
import { Transaction } from "../interface/Transaction";
import { plaidlogo } from "../assets";

interface TransactionsProps {
  selectedAccountId: string | undefined;
  filter: string;
}

const Transactions: React.FC<TransactionsProps> = ({ selectedAccountId, filter }) => {
  const accessToken = localStorage.getItem("access");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + `/api/v0/plaid/transactions`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("transactions:", response.data.transactions);
      setTransactions(response.data.transactions);
    };
    fetchTransaction();
  }, [accessToken]);

  // const filteredAccounts = selectedAccountId
  //   ? transactions.filter((tx) => tx.account_id === selectedAccountId)
  //   : transactions;

  const changeAmount = (amount: number | any) => {
    return (amount < 0 ? "-" : "") + "$" + Math.abs(amount).toFixed(2);
  };

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    return transactions
      .filter((tx) => !selectedAccountId || tx.account_id === selectedAccountId)
      .filter((tx) => {
        const transactionDate = new Date(tx.date);
        switch (filter) {
          case "week":
            return transactionDate >= new Date(new Date().setDate(now.getDate() - 7))
          case "month":
            return transactionDate >= new Date(new Date().setMonth(now.getMonth() - 1))
          case "year":
            return transactionDate >= new Date(new Date().setFullYear(now.getFullYear() - 1))
          default:
            return true;
        }
      });
  }, [transactions, selectedAccountId, filter])

  return (
    <div className={style.transaction_container}>
      {filteredTransactions.map((item: Transaction, idx: number) => (
        <div key={idx} className={style.transactions}>
          <p className={style.date}>{item.date} &nbsp;</p>{" "}
          <p className={style.name}>
            <img src={item.logo_url ? item.logo_url : plaidlogo}/> {item.name} &nbsp;
          </p>
          <p className={style.amount}>{changeAmount(item.amount)} &nbsp;</p>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
