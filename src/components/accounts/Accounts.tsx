import { useEffect, useState} from "react"
import { useGetAuthQuery } from "../../features/api/pennyApi";
import { AccountGroup, Account } from "../../interface/Account";
import style from './Accounts.module.css'
import axios from "axios";


// interface AccountsProps {
//     selectedAccountId: string | undefined;
//     setSelectedAccountId: (id: string) => void;
// }

const Accounts: React.FC<{ onAccountSelect: (accountId: string) => void }> = ({ onAccountSelect }) => {
    const accessToken = localStorage.getItem('access');
    // const generatedToken = localStorage.getItem('gen_access')
    const { data, isLoading, isSuccess } = useGetAuthQuery(0);
    const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>(undefined)
    const [accountGroups, setAccountGroups] = useState<AccountGroup[]>([]);


    useEffect(() => {
        if (isSuccess && data) {
            const fetchInstitutionNames = async () => {
                try {
                const updatedAccountGroups = await Promise.all(data.auths.map(async (accountGroup: AccountGroup) => {
                    const institutionId = accountGroup.item.institution_id as string
                    const response = await axios.get(import.meta.env.VITE_API_URL + `/api/v0/plaid/institutions/${institutionId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                                }
                            });
                            console.log("response:", response.data)
                            return {
                                ...accountGroup,
                                institution_name: response.data.institution.name
                        };
                    }));
                    setAccountGroups(updatedAccountGroups);
                    
                    } catch (error) {
                        console.error(`Failed to fetch institution name for:`, error)
                    }
            };

            fetchInstitutionNames();
        }
    }, [data, isSuccess, accessToken])

    console.log("account data:", data)
    // const result = data as Data | undefined;
    // console.log("result:", result)
    // console.log("ins_id:", result?.auths[0].item.institution_id)
    
    const handleAccountClick = (accountId: string) => {
        setSelectedAccountId(accountId);
        onAccountSelect(accountId);
    };

    if (isLoading) return <div>Loading...</div>;
    

    // const filteredData = data?.auths.flatMap((accountGroup: AccountGroup) => accountGroup.accounts) || [];
    // const uniqueAccountIds = [...new Set(filteredData.map(account => account.account_id))]

    // const handleAccountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedAccountId(event.target.value)
    // }
    
    // change the way interval is set
    // useEffect(() => {
    //     let interval: number | undefined;
    //     if (isSuccess && !isLoading) {
    //         interval = setInterval(() => {

    //             if (!isLoading) {
    //                 refetch();
    //             }
    //         }, 240000);
        
    //     }
    //     return () => {
    //         if (interval) {
    //             clearInterval(interval);
    //         }
    //     }
    // }, [isSuccess, isLoading, refetch])

    
  return (
    <>
        {accountGroups.map((accountGroup: AccountGroup) => (
            <div key={accountGroup.item.item_id} className={style.institution}>
                <h4 className={style.ins_name}>{accountGroup.institution_name}</h4>
                <ul>
                    {accountGroup.accounts.map((account: Account) => (
                        <li
                            key={account.account_id}
                            className={selectedAccountId === account.account_id ? style.selectedAccount : style.account}
                            onClick={() => handleAccountClick(account.account_id)}
                            >
                                {account.name}
                            </li>
                    ))}
                </ul>
            </div>
        ))}
    </>
  )
}

export default Accounts


