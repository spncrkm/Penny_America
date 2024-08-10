import axios from "axios"
import { useEffect } from "react"


const Transactions = () => {

    const accessToken = sessionStorage.getItem('token')

    useEffect(() => {

        const transaction = async () => {
            const response = await axios.get('http://127.0.0.1:8000/api/v0/plaid/transactions', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log("hi where am i ",response.data)
        }
        transaction();
    }, [])


  return (
    <div>
      
    </div>
  )
}

export default Transactions
