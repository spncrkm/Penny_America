import { useEffect } from "react";
import { setTokens } from "./authSlice";
import { useAccountRefreshMutation } from "./api/pennyApi";
import { useAppDispatch } from "./hooks";
import { useNavigate } from "react-router-dom";

const useTokenRefresh = (interval: number = 10 * 60 * 1000) => {
    const dispatch = useAppDispatch();
    const refreshToken = localStorage.getItem('refresh');
    const navigate = useNavigate();

    const [accountRefresh ] = useAccountRefreshMutation();

    useEffect(() => {
        const refreshAuthToken = async () => {
            if (refreshToken) {
                try {
                    const result = await accountRefresh({ refreshToken }).unwrap();
                        dispatch(setTokens(result));
                        console.log('Tokens refreshed successfully:', result);
                } catch (error) {
                    console.log('Token refresh failed:', error)
                    navigate('/login')
                }
            }
        };
        refreshAuthToken();
        const intervalId = setInterval(refreshAuthToken, interval);

        return () => clearInterval(intervalId);
    },[interval, refreshToken, dispatch, accountRefresh]);
        
};

export default useTokenRefresh;
