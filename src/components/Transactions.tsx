
import style from "./transactions.module.css";
import { Transaction } from "../interface/Transaction";
import { plaidlogo } from "../assets";

export interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  
  const changeAmount = (amount: number) => {
    return (amount < 0 ? "-" : "") + "$" + Math.abs(amount).toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  return (
    <div className={style.transaction_container}>
      {transactions.map((item: Transaction, idx: number) => (
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
