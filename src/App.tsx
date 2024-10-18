import React from "react";
import { Outlet, Navigate, HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Movies from "./pages/Movies";
import AssetDetails from "./pages/AssetDetails";
import WatchList from "./pages/WatchList";
import TVShows from "./pages/TVShows";
import AppLoader from "./components/AppLoader";
import UserForm from "./components/UserForm";
import useAuth from "./hooks/useAuth";
import { Provider, useSelector } from "react-redux";
import store from "./store";
import { AssetType } from "./utils/constants";
import { getSearchParamPopularityDesc } from "./utils/utils";
import { selectCanShowAppLoader } from "./store/appLoaderSlice";

const Layout = () => {
  const canShowAppLoader = useSelector(selectCanShowAppLoader);
  useAuth();
  return canShowAppLoader ? (
    <AppLoader />
  ) : (
    <>
      <Navbar />
      <Outlet />
      <UserForm />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Navigate
                  to={`/${AssetType.Movies}?${getSearchParamPopularityDesc()}`}
                />
              }
            />
            <Route path={`/${AssetType.Movies}`} element={<Movies />} />
            <Route
              path={`/${AssetType.Movies}/:id`}
              element={<AssetDetails assetType={AssetType.Movies} />}
            />
            <Route path={`/${AssetType.TVShows}`} element={<TVShows />} />
            <Route
              path={`/${AssetType.TVShows}/:id`}
              element={<AssetDetails assetType={AssetType.TVShows} />}
            />
            <Route path="/watchlist" element={<WatchList />} />
          </Route>
        </Routes>
      </HashRouter>
    </Provider>
  );
};

export default App;
