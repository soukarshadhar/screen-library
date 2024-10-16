import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faMagnifyingGlass,
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

  return (
    <nav className={id || navActive ? "active" : ""}>
      <img className="logo" src={Logo} alt="logo" />
      <div className="section-one">
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
      <div className="section-two">
        {/* <Link to="/search" className="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link> */}
        <FontAwesomeIcon
          onClick={handleOnProfileClick}
          className="profile-icon"
          icon={faUserCircle}
        />
      </div>
      {showProfileDropdown && (
        <div className="profile-dropdown">
          {user && (
            <span>
              Welcome <b>{user.displayName}</b>
            </span>
          )}
          {user && <div onClick={handleOnSignOutClick}>Logout</div>}
          {!user && <div onClick={handleOnSignInClick}>Sign In</div>}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
