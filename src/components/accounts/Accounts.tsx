import { useEffect, useState} from "react"
import { useGetAuthQuery } from "../../features/api/pennyApi";
import { Data, AccountGroup, Account } from "../../interface/Account";
import style from './Accounts.module.css'
import axios from "axios";


interface AccountsProps {
    selectedAccountId: string | undefined;
    setSelectedAccountId: (id: string) => void;
}

const Accounts: React.FC<{ onAccountSelect: (accountId: string) => void }> = ({ onAccountSelect }) => {
    const accessToken = localStorage.getItem('access');
    const { data, isLoading, refetch, isSuccess } = useGetAuthQuery(0);
    const [selectedAccountId, setSelectedAccountId] = useState<string | undefined>(undefined)
    const [accountGroups, setAccountGroups] = useState<AccountGroup[]>([]);

    console.log("data:", data)
    // console.log("ins_id_main:", data.auths.item.institution_id)


    useEffect(() => {
        if (isSuccess && data) {
            const fetchInstitutionNames = async () => {
                const updatedAccountGroups = await Promise.all(data.auths.map(async (accountGroup: AccountGroup) => {
                    const institutionId = accountGroup.item.institution_id as string
                try {
                    const response = await axios.get(import.meta.env.VITE_API_URL + `/api/v0/plaid/institutions/${institutionId}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                                }
                            });
                            console.log(response.data)
                            return {
                                ...accountGroup,
                                institution_name: response.data.institution.name
                        };
                    } catch (error) {
                        console.error(`Failed to fetch institution name for ${accountGroup.institution_id}`)
                        return accountGroup;
                    }
                }));
                setAccountGroups(updatedAccountGroups);
                console.log("accountGroups:",accountGroups)
            };
            fetchInstitutionNames();
        }
    }, [data, isSuccess])


    const result = data as Data | undefined;
    console.log("result:", result)
    console.log("ins_id:", result?.auths[0].item.institution_id)
    
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

    // useEffect(() => {
    //     const fetchInstitutions = async () => {
    //         // const instiutionId = "ins_20"
    //         const response = await axios.get(import.meta.env.VITE_API_URL + `/api/v0/plaid/institutions/${ins_id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${accessToken}`,
    //             }
    //         })
    //         console.log(response.data)
    //     }
    //     fetchInstitutions();
    // },[])


  return (
    <div>
        {accountGroups.map((accountGroup: AccountGroup) => (
            <div key={accountGroup.item_id} className={style.institution}>
                <h4>{accountGroup.institution_name}</h4>
                <ul>
                    {accountGroup.accounts.map((account: Account) => (
                        <li
                            key={account.account_id}
                            className={selectedAccountId === account.account_id ? style.selectedAccount : style.account}
                            onClick={() => handleAccountClick(account.account_id)}
                            >
                                {account.official_name}
                            </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
  )
}

export default Accounts


