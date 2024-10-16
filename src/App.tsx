import React, { useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import AssetDetails from "./pages/AssetDetails";
import WatchList from "./pages/WatchList";
import TVShows from "./pages/TVShows";
import UserForm from "./components/UserForm";
import useAuth from "./hooks/useAuth";
import { Provider } from "react-redux";
import store from "./store";
import { getSearchParamPopularityDesc } from "./utils/utils";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useAuth();

  useEffect(() => {
    if (pathname === "/") {
      navigate(`/movies?${getSearchParamPopularityDesc()}`, { replace: true });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <UserForm />
    </>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/movies",
          element: <Movies />,
        },
        {
          path: "/tvshows",
          element: <TVShows />,
        },
        {
          path: "/:assetType/:id",
          element: <AssetDetails />,
        },
        {
          path: "/watchlist",
          element: <WatchList />,
        },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
