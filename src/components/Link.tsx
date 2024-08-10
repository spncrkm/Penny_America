import React from "react";
import { usePlaidLink } from "react-plaid-link";


interface LinkProps {
    linkToken: string | null;
}

const Link: React.FC<LinkProps> = (props: LinkProps) => {
    const onSuccess = React.useCallback((public_token: any, metadata: any) => {
        const response = fetch('http://127.0.0.1:8000/api/v0/plaid/sandbox_public_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_token }),
        });

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

export default Link
