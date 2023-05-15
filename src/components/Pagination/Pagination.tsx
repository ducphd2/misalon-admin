import classNames from "classnames/bind";
import React, { useCallback, useEffect, useMemo } from "react";
import styles from "./Pagination.module.scss";
interface PaginationType {
  pageSize: number;
  totalData: number;
  onChangePage: Function;
  currentPage:number;
}
const cx = classNames.bind(styles);
function Pagination(props: PaginationType) {
  const { totalData, pageSize, onChangePage,currentPage } = props;
  const totalPage = Math.ceil(totalData / pageSize);

  const handleClick = useCallback((event: any) => {
    const getNumberPage = Number(event.target.id);
    onChangePage(getNumberPage);
  },[onChangePage]);

  const goNext = () => {
    if (currentPage < totalPage) {
      onChangePage(currentPage + 1);
    }
  };

  const goPrev = () => {
    if (currentPage - 1 > 0) {
      onChangePage(currentPage - 1);
    }
  };

  const pages = useMemo(() => {
    const start = Math.floor((currentPage - 1) / 3) * 3;
    const end = start + 3 > totalPage ? totalPage : start + 3;
    return Array.from({ length: end - start }, (_, i) => start + i + 1);
  }, [currentPage, totalPage]);

  const renderPageNumbers = useMemo(
    () =>
      pages.map((number: any) => {
        return (
          <li
            key={number}
            id={number}
            onClick={handleClick}
            className={cx(
              "list-item-paginate",
              currentPage === number && "active-page"
            )}
          >
            {number}
          </li>
        );
      }),
    [currentPage, pages,handleClick]
  );
  // useEffect(() => {
  //   if (pageSize) {
  //     onChangePage(1);
  //   }
  // }, [pageSize]);
  return (
    <div className={cx("pagination-wrapper")}>
      <button
        type="button"
        onClick={goPrev}
        className={cx(
          "move-page-btn",
          "prev-btn",
          currentPage - 1 <= 0 && "disabled-btn"
        )}
        disabled={currentPage - 1 <= 0}
      >
        Previous
      </button>
      {renderPageNumbers}
      <button
        type="button"
        onClick={goNext}
        className={cx(
          "move-page-btn",
          "next-btn",
          currentPage - totalPage >= 0 && "disabled-btn"
        )}
        disabled={currentPage - totalPage >= 0}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
