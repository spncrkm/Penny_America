import { withAuthenticationRequired } from "@auth0/auth0-react";
import { ReactNode } from "react";
import { Spinner } from "react-bootstrap";

interface AuthGuardProps {
    component: ReactNode | any;
}

const AuthGuard = ({ component }: AuthGuardProps) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div className="text-center mt-5">
                <Spinner />
            </div>
        ),
    });

    return <Component />;
}

export default AuthGuard;