import React, { useState, useEffect } from "react";
import { getAssetImageURL } from "../../utils/constants";
import "../../styles/card.scss";
import ImageLoader from "../../assets/loading.png";
import NoImage from "../../assets/noImage.jpg";

type ProfileCardProps = {
  imagePath: string;
  title: string;
};

const ProfileCard = ({ imagePath, title }: ProfileCardProps) => {
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

  return (
    <div className="profile-card">
      <img src={imgUrl} alt={title} />
      <h5>{title}</h5>
    </div>
  );
};

export default ProfileCard;
