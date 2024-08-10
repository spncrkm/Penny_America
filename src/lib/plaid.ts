import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': '66a852d7210c9b001a1cd11e',
            'PLAID-SECRET': '7d795ad27b802aeaa8426549fd3705',
        }
    }
})

export const plaidClient = new PlaidApi(configuration);