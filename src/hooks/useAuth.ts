import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { hydrateWatchListIds, resetWatchList } from "../store/watchListSlice";
import { setLoading } from "../store/appLoaderSlice";
import { AppDispatch } from "../store";
import { auth } from "../utils/firebase";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authChangeListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, email, uid } = user;
        dispatch(
          setUser({
            displayName: displayName ? displayName : "",
            email: email ? email : "",
            uid,
          })
        );
        dispatch(hydrateWatchListIds(email as string));
      } else {
        dispatch(setUser(null));
        dispatch(resetWatchList());
        dispatch(setLoading(false));
        if (location.pathname === "/watchlist")
          navigate("/", { replace: true });
      }
    });

    return () => {
      authChangeListener();
    };
  }, [location.pathname]);
};

export default useAuth;
