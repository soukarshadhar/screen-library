import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_REQUEST_INIT,
  AssetType,
  ASSET_TYPE_TO_API_PATH,
} from "../utils/constants";
import { selectors, actions } from "../store";

const useListing = (assetType: AssetType, params: string = "") => {
  const dispatch = useDispatch();
  const totalPages: number = useSelector(
    (selectors[assetType] as any).selectTotalPages
  );
  const pageNum: number = useSelector(
    (selectors[assetType] as any).selectPageNumber
  );

  const fetchList = async (nextPageNum: number) => {
    try {
      dispatch(actions[assetType].setLoading(true));
      const data = await fetch(
        `https://api.themoviedb.org/3/discover/${
          ASSET_TYPE_TO_API_PATH[assetType]
        }?include_adult=false&page=${nextPageNum}&without_genres=10749,18,99${
          params ? `&${params}` : ""
        }`,
        GET_REQUEST_INIT
      );

      const { total_pages, results } = await data.json();
      const currentList = results.map((i: any) => {
        return { id: `${i.id}`, posterPath: i.poster_path, title: i.title };
      });

      dispatch(actions[assetType].setList(currentList));
      dispatch((actions[assetType] as any).setTotalPages(total_pages));
      dispatch((actions[assetType] as any).setPageNumber(nextPageNum));
      dispatch(actions[assetType].setLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dispatch(actions[assetType].reset());
    fetchList(1);
  }, [params]);

  const fetchMore = useCallback(() => {
    if (pageNum <= totalPages) {
      fetchList(pageNum + 1);
    }
  }, [pageNum, totalPages]);

  return { fetchMore };
};

export default useListing;
