import React, { useState, useEffect } from "react";
import style from "../studios/studio.module.css";
import { IoIosArrowForward } from "react-icons/io";
import { GrFormPrevious } from "react-icons/gr";

function PaginationNav({ totalPage, pageCount, setPageCount }) {
  const [middlePages, setMiddlePages] = useState([]);

  useEffect(() => {
    const generatePages = () => {
      const startPage = Math.max(1, pageCount - 1);
      const endPage = Math.min(totalPage, pageCount + 1);
      const pages = Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      );
      setMiddlePages(pages);
    };

    generatePages();
  }, [pageCount, totalPage]);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPage) {
      setPageCount(pageNumber);
    }
  };

  const gotoNextPage = () => {
    if (pageCount < totalPage) {
      setPageCount((prevPage) => prevPage + 1);
    }
  };

  const gotoPrevious = () => {
    if (pageCount > 1) {
      setPageCount((prevPage) => prevPage - 1);
    }
  };

  const goToLastPage = () => {
    setPageCount(totalPage);
  };

  const [inputPage, setInputPage] = useState();

  const handleInputChange = (e) => {
    setInputPage(parseInt(e.target.value, 10));
  };

  const goToCustomPage = () => {
    if (inputPage >= 1 && inputPage <= totalPage) {
      setPageCount(inputPage);
    }
  };

  return (
    <>
      <div className={style.mainPaginationDiv}>
        <div className={style.paginationTab}>
          <div
            onClick={gotoPrevious}
            className={pageCount === 1 ? `${style.notAllow}` : ""}
          >
            <IoIosArrowForward />
          </div>
          {middlePages.map((page) => (
            <div
              key={page}
              onClick={() => goToPage(page)}
              className={page === pageCount ? style.activePage : ""}
            >
              {page}
            </div>
          ))}
          <div
            onClick={goToLastPage}
            className={pageCount >= totalPage ? `${style.notAllow}` : ""}
          >
            Last
          </div>
          <div
            onClick={gotoNextPage}
            className={pageCount >= totalPage ? `${style.notAllow}` : ""}
          >
            <IoIosArrowForward />
          </div>
        </div>
        <div className={style.paginationgoto}>
          <input
            type="number"
            placeholder="Go to Page"
            value={inputPage}
            onChange={handleInputChange}
            min="1"
            max={totalPage}
          />
          <button onClick={goToCustomPage}>Go</button>
        </div>
      </div>
    </>
  );
}

export default PaginationNav;
