import { useEffect } from "react"
// import axios from "axios";
import { useGetAuthQuery } from "../../features/api/pennyApi";
import { Data, Account, AccountGroup } from "../../interface/Account";


const Accounts: React.FC = () => {
    const accessToken = localStorage.getItem('access');
    const { data, error, isLoading, refetch, isSuccess } = useGetAuthQuery();

    const filteredData = data as Data | undefined;
    console.log("query accounts",filteredData)

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


    //   const filteredAccounts = filteredData.filter((account: any) => account.name.toLowerCase().includes('checking'))
    //   console.log("filteredAccounts:", filteredAccounts)

    const checkingAccounts = filteredData?.auths.flatMap((accountGroup: AccountGroup) => accountGroup.accounts.filter((account: Account) => account.subtype === 'checking')) || []
    console.log("checkingaccount:", checkingAccounts)

  return (
    <div>
        {checkingAccounts.length > 0 ? (
        checkingAccounts?.map((accounts: Account) => (
            <p key={accounts.account_id}>{accounts.official_name}</p>
        ))
    ) : (
        <p>No checking accounts available</p>
    )}
    </div>
  )
}

export default Accounts
