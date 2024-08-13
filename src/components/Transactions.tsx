import axios from "axios"
import { useEffect, useState } from "react"
import style from './transactions.module.css'

interface Transaction {
    filter(arg0: (transaction: { account_id: string; }) => boolean): unknown;
    account_id: string;
    account_owner: string | null;
    amount: number;
    authorized_date: string | null;
    authorized_datetime: string | null;
}


const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    const accessToken = sessionStorage.getItem('token')

    useEffect(() => {

        const fetchTransaction = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/v0/plaid/transactions', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("Accounts: ",response.data.transactions)
            console.log("transactions:", response.data.transactions)
            setTransactions(response.data.transactions)
        }
        fetchTransaction();
    }, [accessToken])

    const filteredTransactions = transactions.filter((transaction) => transaction.account_id === 'zPGMQ73MrDsZXpXK1Njeu3EVPov5qZIljZMEP')
    console.log(filteredTransactions)

    const formatAmount = (amount: number) => {
        return Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);
    }

  return (
    <div>
      {filteredTransactions.map((item, idx) => (
        <div key={idx} className={style.transactions}>
        <p>date: {item.date} &nbsp; <img src={item.logo_url}/> {item.name} &nbsp;
        ${formatAmount(item.amount)} &nbsp;</p>
        </div>
      ))}
    </div>
  )
}

export default Transactions
