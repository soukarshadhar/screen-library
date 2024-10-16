import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getAssetImageURL } from "../../utils/constants";
import { resolveToArrayIndex } from "../../utils/utils";
import "../../styles/carousel.scss";

type CarouselProps = {
  list: any[];
};

const Carousel = ({ list }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnDecrement = () => {
    setActiveIndex(activeIndex - 1);
  };

  const handleOnIncrement = () => {
    setActiveIndex(activeIndex + 1);
  };

  const renderCarouselImage = () => {
    const resolvedIndex = resolveToArrayIndex(activeIndex, list.length);

    if (list[resolvedIndex]) {
      return (
        <img
          className="image"
          src={`${getAssetImageURL("original")}${
            list[resolvedIndex].backdropPath
          }`}
          alt={`carousel-${list[resolvedIndex].title}`}
        />
      );
    }

    return null;
  };

  const renderCarouselInfo = () => {
    const resolvedIndex = resolveToArrayIndex(activeIndex, list.length);

    if (list[resolvedIndex]) {
      return (
        <div className="info">
          <h1>{list[resolvedIndex].title}</h1>
          <p>{list[resolvedIndex].overview}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="carousel">
      <div className="left-arrow" onClick={handleOnDecrement}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
      {renderCarouselInfo()}
      {renderCarouselImage()}
      <div className="right-arrow" onClick={handleOnIncrement}>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
};

export default Carousel;
