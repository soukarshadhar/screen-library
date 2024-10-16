import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_REQUEST_INIT, ASSET_TYPE_TO_API_PATH } from "../utils/constants";
import { AssetType } from "../utils/constants";
import { actions } from "../store";

const useTopRatedList = (assetType: AssetType) => {
  const dispatch = useDispatch();
  const fetchList = async () => {
    try {
      dispatch((actions[assetType] as any).setLoading(true));
      const data = await fetch(
        `https://api.themoviedb.org/3/${ASSET_TYPE_TO_API_PATH[assetType]}/top_rated`,
        GET_REQUEST_INIT
      );
      const { results } = await data.json();
      const newList = results.map((i: any) => {
        return {
          id: `${i.id}`,
          backdropPath: i.backdrop_path,
          title: i.title || i.name,
          overview: i.overview,
        };
      });
      dispatch(actions[assetType].setList(newList));
      dispatch(actions[assetType].setLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
};

export default useTopRatedList;
