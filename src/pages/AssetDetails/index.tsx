import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAssetImageURL, AssetType } from "../../utils/constants";
import { formatRuntime, formatReleaseDate } from "../../utils/utils";
import { AppDispatch } from "../../store";
import {
  fetchAssetDetails,
  selectAssetInfo,
  selectAssetDetailsIsLoading,
  selectAssetDetailsCast,
  selectAssetDetailsVideo,
  selectAssetDetailsShowVideoPlayer,
  toggleVideoPlayer,
  resetAssetDetails,
} from "../../store/assetDetailsSlice";
import ProfileCard from "../../components/ProfileCard";
import VideoPlayer from "../../components/VideoPlayer";
import "../../styles/details.scss";

const AssetDetails = ({ assetType }: { assetType: AssetType }) => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const assetInfo = useSelector(selectAssetInfo);
  const assetIsLoading = useSelector(selectAssetDetailsIsLoading);
  const assetDetailsCast = useSelector(selectAssetDetailsCast);
  const assetDetailsVideo = useSelector(selectAssetDetailsVideo);
  const showVideoPlayer = useSelector(selectAssetDetailsShowVideoPlayer);

  useEffect(() => {
    dispatch(
      fetchAssetDetails({ assetType: assetType as AssetType, id: id as string })
    );

    return () => {
      dispatch(resetAssetDetails());
    };
  }, []);

  if (assetIsLoading) return null;

  const renderGenres = () => {
    const genres: React.ReactNode[] = [];
    assetInfo.genres.forEach((genre: any, index: number) => {
      if (index === 0) {
        genres.push(<span key={genre.name}>{genre.name}</span>);
      } else {
        genres.push(
          <span key={index}>&#9679;</span>,
          <span key={genre.name}>{genre.name}</span>
        );
      }
    });
    return genres;
  };

  const handleOnToggleVideoPlayer = () => {
    dispatch(toggleVideoPlayer());
  };

  return (
    <>
      <div
        className="asset-backdrop"
        style={{
          backgroundImage: `url(${getAssetImageURL("original")}${
            assetInfo.backdropPath
          })`,
        }}
      >
        <div className="asset-info">
          {assetDetailsVideo && (
            <div>
              <button
                className="watch-button"
                onClick={handleOnToggleVideoPlayer}
                type="button"
              >
                Watch
              </button>
              <a
                className="watch-link"
                target="__blank"
                href={`https://www.youtube.com/watch?v=${assetDetailsVideo.key}`}
              >
                Watch
              </a>
            </div>
          )}
          <div>
            <h1 className="title">{assetInfo.title}</h1>
            <p>{assetInfo.overview}</p>
            <h4 className="asset-stats">
              <span>{`IMDb ${assetInfo.averageVote.toFixed(2)}`}</span>
              {assetInfo.releaseDate && (
                <>
                  <span>&#9679;</span>
                  <span>{formatReleaseDate(assetInfo.releaseDate)}</span>
                </>
              )}
              {assetInfo.runtime > 0 && (
                <>
                  <span>&#9679;</span>
                  <span>{formatRuntime(assetInfo.runtime)}</span>
                </>
              )}
              {assetInfo.noOfSeasons && (
                <>
                  <span>&#9679;</span>
                  <span>{`${assetInfo.noOfSeasons} Season${
                    assetInfo.noOfSeasons > 1 ? "s" : ""
                  }`}</span>
                </>
              )}
              {assetInfo.noOfEpisodes && (
                <>
                  <span>&#9679;</span>
                  <span>{`${assetInfo.noOfEpisodes} Episode${
                    assetInfo.noOfEpisodes > 1 ? "s" : ""
                  }`}</span>
                </>
              )}
            </h4>
            <h4 className="asset-stats">{renderGenres()}</h4>
          </div>
        </div>
      </div>
      {assetDetailsCast.length > 0 && <h2 className="subheading">Casts</h2>}
      <div className="asset-casts">
        {assetDetailsCast.map((cast) => {
          return (
            <ProfileCard
              key={cast.cast_id}
              title={`${cast.name} as ${cast.character}`}
              imagePath={`${getAssetImageURL("original")}${cast.profile_path}`}
            />
          );
        })}
      </div>
      {showVideoPlayer && (
        <VideoPlayer
          videoId={assetDetailsVideo.key}
          onClose={handleOnToggleVideoPlayer}
        />
      )}
    </>
  );
};

export default AssetDetails;
