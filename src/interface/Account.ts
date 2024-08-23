
import { ReactNode } from "react";

export interface Auth {
    accounts: string;
}

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
    item: {
        available_products: [];
        billed_products: [];
        consent_expiration_time: string | null;
        error: string | null;
        institution_id: string;
        item_id: string;
        products: [];
        update_type: string;
        webhook: string;
    }
    ins_id: any;
    name: ReactNode;
    institution_id: any;
    institution_name: string;
    accounts: Account[];
    
}

export interface Data {
        available: number;
        current: number;
        limit: number | null;
        iso_currency_code: string;
        unofficial_currency_code: string | null;
        auths: AccountGroup[];
}
