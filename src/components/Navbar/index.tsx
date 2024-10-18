import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faStar,
  faFilm,
  faRightToBracket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { toggleDialog } from "../../store/dialogSlice";
import { selectUser } from "../../store/userSlice";
import { auth } from "../../utils/firebase";
import { getSearchParamPopularityDesc } from "../../utils/utils";
import { AssetType } from "../../utils/constants";
import "../../styles/navbar.scss";
import Logo from "../../assets/logo.svg";

const Navbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [navActive, setNavActive] = useState(false);
  const [showCollapsedMenu, setShowCollapsedMenu] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);

  const handleOnScroll = () => {
    if (window.scrollY > 30) {
      setNavActive(true);
    } else {
      setNavActive(false);
    }
  };

  const handleOnProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleOnSignOutClick = async () => {
    try {
      await signOut(auth);
      setShowProfileDropdown(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnSignInClick = () => {
    dispatch(toggleDialog());
    setShowProfileDropdown(false);
  };

  const handleOnNavbarClick = (ev: React.MouseEvent<HTMLElement>) => {
    if ((ev.target as any).id === "navOpen") {
      setShowCollapsedMenu(!showCollapsedMenu);
    }

    if ((ev.target as any).id === "navClose") {
      setShowCollapsedMenu(false);
    }
  };

  return (
    <nav
      onClick={handleOnNavbarClick}
      className={`navbar${
        id || navActive || showCollapsedMenu ? " active" : ""
      }`}
    >
      <div className="navbar-menu">
        <img className="navbar-logo" src={Logo} alt="logo" />
        <FontAwesomeIcon
          id="navOpen"
          className="navbar-hamburger"
          icon={faBars}
        />
        <div className="navbar-links">
          <Link
            className={
              pathname === `/${AssetType.Movies}` ||
              pathname === `/${AssetType.Movies}/${id}`
                ? "active"
                : ""
            }
            to={`/${AssetType.Movies}?${getSearchParamPopularityDesc()}`}
          >
            Movies
          </Link>
          <Link
            className={
              pathname === `/${AssetType.TVShows}` ||
              pathname === `/${AssetType.TVShows}/${id}`
                ? "active"
                : ""
            }
            to={`/${AssetType.TVShows}?${getSearchParamPopularityDesc()}`}
          >
            TV Shows
          </Link>
          {user && (
            <Link
              className={pathname === "/watchlist" ? "active" : ""}
              to="/watchlist"
            >
              Watchlist
            </Link>
          )}
        </div>
        <FontAwesomeIcon
          onClick={handleOnProfileClick}
          className="profile-icon"
          icon={faUserCircle}
        />
        {showProfileDropdown && (
          <div className="profile-dropdown">
            {user && <div className="username">{user.displayName}</div>}
            {user && <div className="user-email">{user.email}</div>}
            {user && (
              <div className="sign-out" onClick={handleOnSignOutClick}>
                Sign Out <FontAwesomeIcon icon={faRightFromBracket} />
              </div>
            )}
            {!user && (
              <div className="sign-in" onClick={handleOnSignInClick}>
                Sign In <FontAwesomeIcon icon={faRightToBracket} />
              </div>
            )}
          </div>
        )}
      </div>
      {showCollapsedMenu && (
        <>
          {user && (
            <div className="menu-item">
              <FontAwesomeIcon icon={faUserCircle} />
              <b>{user.displayName}</b>
            </div>
          )}
          <Link
            id="navClose"
            className="menu-item"
            to={`/${AssetType.Movies}?${getSearchParamPopularityDesc()}`}
          >
            <FontAwesomeIcon icon={faFilm} />
            Movies
          </Link>
          <Link
            id="navClose"
            className="menu-item"
            to={`/${AssetType.TVShows}?${getSearchParamPopularityDesc()}`}
          >
            <FontAwesomeIcon icon={faFilm} />
            TV Shows
          </Link>
          {user && (
            <Link id="navClose" className="menu-item" to="/watchlist">
              <FontAwesomeIcon icon={faStar} />
              Watchlist
            </Link>
          )}
          {!user && (
            <div
              id="navClose"
              className="menu-item"
              onClick={handleOnSignInClick}
            >
              <FontAwesomeIcon icon={faRightToBracket} />
              Sign In
            </div>
          )}
          {user && (
            <div
              id="navClose"
              className="menu-item"
              onClick={handleOnSignOutClick}
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              Sign Out
            </div>
          )}
        </>
      )}
    </nav>
  );
};

export default Navbar;
