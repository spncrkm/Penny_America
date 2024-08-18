import { useEffect } from "react";
import { setTokens } from "./authSlice";
import { useAccountRefreshMutation } from "./api/pennyApi";
import { useAppDispatch } from "./hooks";
import { useNavigate } from "react-router-dom";

const useTokenRefresh = (interval: number = 10 * 60 * 1000) => {
    const dispatch = useAppDispatch();
    // const refreshToken = useAppSelector((state) => state.auth.refresh);
    const refreshToken = localStorage.getItem('refresh');
    const navigate = useNavigate();

    const [accountRefresh ] = useAccountRefreshMutation();

    useEffect(() => {
        const refreshAuthToken = async () => {
            if (refreshToken) {
                try {
                    const result = await accountRefresh({ refreshToken }).unwrap();

                    if (result) {
                        dispatch(setTokens(result));
                        console.log('Tokens refreshed successfully:', result);
                    
                    }
                } catch (error) {
                    console.log('Token refresh failed:', error)
                    navigate('/')
                }
            }
        };
        refreshAuthToken();
        const intervalId = setInterval(refreshAuthToken, interval);

        return () => clearInterval(intervalId);
    },[interval, refreshToken, dispatch, accountRefresh]);
        
};

export default useTokenRefresh;

// try {
//     const response = await dispatch(refreshTokenThunk(refreshToken)).unwrap();
//     if (response) {
//         dispatch(setTokens({ access: response.access, refresh: response.refresh }));
//     }
// } catch (error) {
//     dispatch(clearTokens());
//     console.log('Token refresh failed:', error)
// }