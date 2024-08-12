// import { CountryCode, Products } from "plaid";
// import { plaidClient } from "./plaid";
// import { User } from "../interface/Users";

// export const createLinkToken = async (user: User) => {
//     try {
//         const tokenParams = {
//             user: {
//                 client_user_id: user.id
//             },
//             client_name: user.username,
//             products: ['auth'] as Products[],
//             language: 'en',
//             country_codes: ['US'] as CountryCode[],
//         }
//         const response = await plaidClient.linkTokenCreate(tokenParams);

//         return parseStringify({ linkToken })
//     } catch (error) {
//         console.log(error);
//     }
// }