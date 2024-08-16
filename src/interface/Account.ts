

// export interface Balances {
//     available: number;
//     current: number;
//     limit: number | null;
//     iso_currency_code: string;
//     unofficial_currency_code: string | null;
// }

export interface Account {
    account_id: string;
    balances: {
    available: number;
    current: number;
    limit: number | null;
    iso_currency_code: string;
    unofficial_currency_code: string | null;
    };
    mask: string;
    name: string;
    official_name: string;
    persistent_account_id: string;
    subtype: string;
    type: string;
}

export interface AccountGroup {
    accounts: Account[];
}

export interface Data {
    auths: AccountGroup[];
}
