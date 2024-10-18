import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAssetImageURL } from "../../utils/constants";
import "../../styles/card.scss";
import ImageLoader from "../../assets/loading.png";
import NoImage from "../../assets/noImage.jpg";

type CardProps = {
  imagePath: string;
  id: string;
  title: string;
  isSelected: boolean;
  buildCardLink: (id: string) => string;
};

const Card = ({
  imagePath,
  id,
  title,
  isSelected,
  buildCardLink,
}: CardProps) => {
  const [imgUrl, setImgUrl] = useState(ImageLoader);
  const [imgLoadError, setImgLoadError] = useState(false);

  useEffect(() => {
    if (imagePath) {
      const imageUrl = `${getAssetImageURL("original")}${imagePath}`;
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setImgUrl(imageUrl);
      };
      img.onerror = () => {
        setImgUrl(NoImage);
        setImgLoadError(true);
      };
    } else {
      setImgUrl(NoImage);
    }
  }, []);

  const renderIcons = () => {
    if (isSelected) {
      return (
        <>
          <path
            data-id={id}
            data-icon="check"
            d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
          />
          <path
            data-id={id}
            data-icon="trash"
            d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
          />
        </>
      );
    }

    return (
      <path
        data-id={id}
        data-icon="plus"
        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
      />
    );
  };

  return (
    <div className="card">
      <span
        title={isSelected ? "Remove from Watchlist" : "Add to Watchlist"}
        data-id={id}
        className="action-icon"
      >
        <svg
          data-id={id}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          {renderIcons()}
        </svg>
      </span>
      <Link to={buildCardLink(id)}>
        <img src={imgUrl} alt={title} />
      </Link>
      {(!imagePath || imgLoadError) && (
        <div className="card-title">{title}</div>
      )}
    </div>
  );
};

export default Card;
