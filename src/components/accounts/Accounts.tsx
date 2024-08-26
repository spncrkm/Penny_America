
import { AccountGroup, Account } from "../../interface/Account";
import style from './Accounts.module.css'


interface AccountsProps {
    onAccountSelect: (accountId: string) => void;
    accountGroups: AccountGroup[];
    selectedAccountId: string | undefined;
}

const Accounts: React.FC<AccountsProps> = ({ onAccountSelect, accountGroups, selectedAccountId }) => {

    
    const handleAccountClick = (accountId: string) => {
        onAccountSelect(accountId);
    };
    
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
    <div className={style.account_container}>
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
    </div>
  )
}

export default Accounts


