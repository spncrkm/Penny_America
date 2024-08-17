import { useEffect, useState } from "react"
// import axios from "axios";
import { useGetAuthQuery } from "../../features/api/pennyApi";
import { Data, Account, AccountGroup } from "../../interface/Account";
import axios from "axios";


const Accounts: React.FC = () => {
    const accessToken = localStorage.getItem('access');
    const { data, error, isLoading, refetch, isSuccess } = useGetAuthQuery();
    // const [filteredData, setFilteredData] = useState<Data | undefined>();

    const filteredData = data as Data | undefined;
    console.log("query accounts",filteredData)
    console.log("filter:", filteredData?.auths.flatMap((accountGroup: AccountGroup) => accountGroup))

    

    useEffect(() => {
        let interval: number | undefined;
        if (isSuccess && !isLoading) {
            const interval = setInterval(() => {

                if (!isLoading) {
                    refetch();
                }
            }, 180000);
        
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    }, [isSuccess, isLoading, refetch])

    useEffect(() => {
        const fetchInstitutions = async () => {
            const instiutionId = "ins_35"
            const response = await axios.get(`http://127.0.0.1:8000/api/v0/plaid/institutions/${instiutionId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            console.log(response.data)
        }
        fetchInstitutions();
    },[])


    //   const filteredAccounts = filteredData.filter((account: any) => account.name.toLowerCase().includes('checking'))
    //   console.log("filteredAccounts:", filteredAccounts)

    // const checkingAccounts = filteredData?.auths.flatMap((accountGroup: AccountGroup) => accountGroup.accounts.filter((account: Account) => account.subtype === 'checking')) || []
    // console.log("checkingaccount:", checkingAccounts)

  return (
    <div>
        {/* {checkingAccounts.length > 0 ? (
        checkingAccounts?.map((accounts: Account) => (
            <p key={accounts.account_id}>{accounts.official_name}</p>
        )) */}
        {filteredData ? (
        filteredData?.auths.map((accountGroup: AccountGroup, idx) => (
            <p key={idx}>{accountGroup.accounts.map((account: any, index) => (
                <p key={index}>{account.official_name}</p>
            ))}</p>
        ))
    ) : (
        <p>No checking accounts available</p>
    )}
    </div>
  )
}

export default Accounts
