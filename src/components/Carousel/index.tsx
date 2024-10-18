import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { getAssetImageURL, AssetType } from "../../utils/constants";
import { resolveToArrayIndex } from "../../utils/utils";
import "../../styles/carousel.scss";

type CarouselProps = {
  list: any[];
  assetType: AssetType;
  loading: boolean;
};

const Carousel = ({ list, assetType, loading }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const resolvedIndex = resolveToArrayIndex(activeIndex, list.length);

  const handleOnDecrement = () => {
    setActiveIndex(activeIndex - 1);
  };

  const handleOnIncrement = () => {
    setActiveIndex(activeIndex + 1);
  };

  if (loading || list.length === 0) return <div className="carousel" />;

  return (
    <div
      className="carousel"
      style={{
        backgroundImage: `url(${getAssetImageURL("original")}${
          list[resolvedIndex].backdropPath
        })`,
      }}
    >
      <div className="left-arrow" onClick={handleOnDecrement}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      <div className="info">
        <h1>{list[resolvedIndex].title}</h1>
        <p>{list[resolvedIndex].overview}</p>
        <Link to={`/${assetType}/${list[resolvedIndex].id}`}>
          <FontAwesomeIcon icon={faInfoCircle} />
          More Info
        </Link>
      </div>
      <div className="right-arrow" onClick={handleOnIncrement}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
};

export default Carousel;
