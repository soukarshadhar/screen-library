import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMultiply } from "@fortawesome/free-solid-svg-icons";

const VideoPlayer = ({
  videoId,
  onClose,
}: {
  videoId: string;
  onClose: (ev: React.MouseEvent<SVGSVGElement>) => void;
}) => {
  return (
    <div className="video-player">
      <FontAwesomeIcon icon={faMultiply} onClick={onClose} />
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="autoplay"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
