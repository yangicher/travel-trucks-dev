import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../api/campersApi";
import { setFilters } from "../../redux/slice";
import {
  selectCampers,
  selectFilters,
  selectCampersStatus,
} from "../../redux/selectors";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import css from "./CatalogPage.module.css";
import toast, { Toaster } from "react-hot-toast";
import CatalogLoader from "../../components/CatalogLoader/CatalogLoader";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const filters = useSelector(selectFilters);
  const status = useSelector(selectCampersStatus);
  const campersPerPage = 4;

  const [visibleCount, setVisibleCount] = useState(campersPerPage);
  const [toastShown, setToastShown] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  useEffect(() => {
    if (isSearchClicked && status === "succeeded" && !toastShown) {
      toast.success("Campers loaded successfully!");
      setToastShown(true);
      setIsSearchClicked(false);
    } else if (isSearchClicked && status === "failed") {
      toast.dismiss("loading-toast");
      toast.error("No campers found with the specified filters");
      setToastShown(false);
      setIsSearchClicked(false);
    }
  }, [status, toastShown, isSearchClicked]);

  useEffect(() => {
    setVisibleCount(campersPerPage);
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + campersPerPage);
  };

  return (
    <div className={css.catalogPage}>
      <Toaster position="top-center" reverseOrder={false} />

      <div className={css.filterContainer}>
        <FilterPanel
          filters={filters}
          setFilters={handleFilterChange}
          onFilterChange={handleFilterChange}
          onSearchClick={() => setIsSearchClicked(true)}
        />
      </div>

      <div className={css.catalogContainer}>
        {status === "loading" && <CatalogLoader />}

        {status === "succeeded" &&
          campers
            .slice(0, visibleCount)
            .map((camper) => <VehicleCard key={camper.id} camper={camper} />)}

        {visibleCount < campers.length && (
          <button className={css.loadMoreBtn} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
