import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);
  return (
    <>
      <div className="homepage">
        <div className="layover"></div>
        <Link to="/dashboard" className="btn btn-lg view-dashboard">
          View Dashboard
        </Link>
      </div>
    </>
  );
};

export default HomePage;