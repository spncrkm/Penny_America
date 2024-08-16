
import React, { useEffect, useState } from 'react'
import { usePlaidLink } from 'react-plaid-link'
import { useAppDispatch, useAppSelector } from '../features/hooks';



const PlaidLink = () => {
    const [linkToken, setLinkToken] = useState(null);
    const accessToken = useAppSelector(state => state.auth.access)
    console.log("accessToken:", accessToken)

    useEffect(() => {
            const getLinkToken = async () => {
              if (linkToken === null) {
                try {
                  
                  const response  = await fetch('http://127.0.0.1:8000/api/v0/plaid/create_link_token', {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${accessToken}`
                      },
                  });
                  const data = await response.json()
                  setLinkToken(data?.link_token);
              } catch (error) {
                console.log("Failed to create link token:", error)
            } 
          }
          }
            getLinkToken();
          }, [accessToken])
        // console.log('Successful link_token:', linkToken)

          return (
            linkToken != null ? <Link linkToken={linkToken} /> : <div>Loading...</div>
          )
}

interface LinkProps {
  linkToken: string;
}

const Link: React.FC<LinkProps> = ({ linkToken }) => {
  const accessToken = localStorage.getItem('access') as string

  const onSuccess = React.useCallback((public_token: any, metadata: any) => {
      fetch('http://127.0.0.1:8000/api/v0/plaid/gen_access_token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ token: public_token }),
        })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('public_token', public_token)
          console.log("Successfully generated access token:", data);
        });

  }, [accessToken])


  const config: Parameters<typeof usePlaidLink>[0] = {
      token: linkToken!,
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
