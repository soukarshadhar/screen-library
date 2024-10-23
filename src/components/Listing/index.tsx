import React, { useEffect, useCallback } from "react";
import Card from "../../components/Card";
import ShimmerCard from "../ShimmerCard";
import "../../styles/listing.scss";

type ListingProps = {
  list: any[];
  loading: boolean;
  selectedItems: string[];
  noOfItemsLoading?: number;
  onItemClick: (event: React.MouseEvent<HTMLElement>) => void;
  fetchMore: () => void;
  buildCardLink: (id: string) => string;
};

const Listing = ({
  list,
  loading,
  fetchMore,
  onItemClick,
  selectedItems = [],
  buildCardLink,
  noOfItemsLoading = 20,
}: ListingProps) => {
  const handleOnScroll = useCallback(() => {
    if (
      window.scrollY + window.innerHeight >=
      document.body.scrollHeight - 100
    ) {
      fetchMore();
    }
  }, [fetchMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, [handleOnScroll]);

  const renderShimmer = () => {
    const shimmers = [];
    for (let i = 0; i < noOfItemsLoading; i++) {
      shimmers.push(<ShimmerCard key={i} />);
    }
    return shimmers;
  };

  return (
    <div className="listing" onClick={onItemClick}>
      {list.map((item: any) => {
        return (
          <Card
            key={item.id}
            imagePath={item.posterPath}
            id={item.id}
            title={item.title}
            rating={item.averageVote}
            isSelected={selectedItems.includes(item.id)}
            buildCardLink={buildCardLink}
          />
        );
      })}
      {loading && renderShimmer()}
    </div>
  );
};

export default Listing;
