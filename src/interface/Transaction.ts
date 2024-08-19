export interface Location {
  address: string | null;
  city: string | null;
  region: string | null;
  postal_code: string | null;
  country: string | null;
  lat: number | null;
  long: number | null;
}

interface PaymentMeta {
  reference_number: string | null;
  ppd_id: string | null;
  by_order_of: string | null;
  payee: string | null;
  payer: string | null;
  payment_method: string | null;
  payment_processor: string | null;
  reason: string | null;
}

interface PersonalFinanceCategory {
  confidence_level: string;
  detailed: string;
  primary: string;
}

interface CounterParties {
  confidence_level: string | null;
  entity_id: string | null;
  logo_url: string | null;
  name: string | null;
  phone_number: string | null;
  type: string | null;
  website: string | null;
}

export interface Transaction {
  [x: string]: any;
  account_id: string | null;
  account_owner: string | null;
  amount: number | null;
  authorized_date: string | null;
  authorized_datetime: string | null;
  category: string[] | null;
  category_id: string | null;
  counterparties: CounterParties[];
  date: string;
  datetime: string | null;
  iso_currency_code: string;
  location: Location;
  logo_url: string;
  merchant_entity_id: string;
  merchant_name: string | null;
  name: string | null;
  payment_channel: string;
  payment_meta: PaymentMeta;
  pending: boolean;
  pending_transaction_id: string | null;
  personal_finance_category: PersonalFinanceCategory;
  personal_finance_category_icon_url: string;
  transaction_code: string | null;
  transaction_id: string;
  transaction_type: string;
  unofficial_currency_code: string | null;
  website: string | null;
}

export interface TransactionProp {
    transactions: Transaction[];
}
