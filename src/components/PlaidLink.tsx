
import React, { useEffect, useState } from 'react'
import { usePlaidLink } from 'react-plaid-link'


const PlaidLink = () => {

    const [linkToken, setLinkToken] = useState(null);
    const accessToken = sessionStorage.getItem('token') as string
    console.log("accessToken:", accessToken)
    useEffect(() => {
        const getLinkToken = async () => {
            const response  = await fetch('http://127.0.0.1:8000/api/v0/plaid/create_link_token', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${accessToken}`
                },
            });
            const data = await response.json()
            setLinkToken(data?.link_token);
            // console.log(data)
        }

        getLinkToken();
    }, [])
    console.log('linkToken:', linkToken)

  return (
    linkToken != null ? <Link linkToken={linkToken} /> : <></>
  )
}

interface LinkProps {
  linkToken: string | null;
}

const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const accessToken = sessionStorage.getItem('token') as string
  const onSuccess = React.useCallback((public_token: any, metadata: any) => {
      const response = fetch('http://127.0.0.1:8000/api/v0/plaid/gen_access_token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({token: public_token}),
        });
          console.log("hello:", public_token)

  }, [])
  const config: Parameters<typeof usePlaidLink>[0] = {
      token: props.linkToken!,
      onSuccess,
  }
  const { open, ready } = usePlaidLink(config)

  
  
return (
  <button onClick={() => open()} disabled={!ready}>
      Link account
  </button>
)
}


export default PlaidLink
