import axios from "axios"
import { useEffect, useState } from "react"
import style from './transactions.module.css'
import { Transaction } from "../interface/Transaction"

const Transactions = () => {
  const accessToken = localStorage.getItem('access')
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    // const { data, isLoading, isError } = PennyApi.useGetTransactionsQuery(userAccessToken)
    // console.log("transaction data", data)

 
    useEffect(() => {

      const fetchTransaction = async () => {
          const response = await axios.get(import.meta.env.VITE_API_URL + `/api/v0/plaid/transactions`, {
              method: 'GET',
              headers: {
                  Authorization: `Bearer ${accessToken}`,
              },
          });
          console.log("transactions:", response.data.transactions)
          setTransactions(response.data.transactions)
      }
      fetchTransaction();
  }, [accessToken]);

      // useEffect(() => {
      //   const fetchAccounts = async () => {
      //     const response = await axios.get('http://127.0.0.1:8000/api/v0/plaid/auth', {
      //       method: 'GET',
      //       headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //       },
      //     })
      //     console.log("accounts:", response.data.auths[0].accounts)
      //   }
      //   fetchAccounts();
      // },[accessToken])
      

    // for (let index = 0; index < transactions.length; index++) {
    //   const accountId = transactions[index]
    //   console.log("accountId:", accountId)
          
    //   };
    //   if (accountId) {
    //     accountId.filter((account) => account === account.account_id)
    //   }
    
    // console.log(transactions.transactions.filter((transaction) => transaction.index))
    // const accountId = transactions[0].account_id
    // const filteredTransactions = transactions.filter((transaction) => transaction.index === 0);
    // console.log("filteredTransactions:",filteredTransactions)

    // const formatAmount = (amount: number) => {
    //     return Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);
    // }

    const changeAmount = (amount: number | any ) => {
      return (amount < 0 ? '-' : '') + "$" + Math.abs(amount).toFixed(2);
    }

 
      return (
        <div>
          {transactions?.map((item: Transaction, idx: number) => (
            <div key={idx} className={style.transactions}>
            <p>date: {item.date} &nbsp; <img src={item.logo_url}/> {item.name} &nbsp;
            {changeAmount(item.amount)} &nbsp;</p>
            </div>
          ))}
        </div>
      )
    
    }

export default Transactions
