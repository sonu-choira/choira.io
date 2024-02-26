import React, { useState } from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import "../studios/studios.css";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const [inputPage, setInputPage] = useState('');

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const goToPage = () => {
    const pageNumber = parseInt(inputPage, 10);

    if (pageNumber && pageNumber >= 1 && pageNumber <= paginationRange[paginationRange.length - 1]) {
      onPageChange(pageNumber);
      setInputPage('');
    }
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="mainPaginationDiv">
      <ul className={classnames('pagination-container', { [className]: className })}>
        <li className={classnames('pagination-item', { disabled: currentPage === 1 })} onClick={onPrevious}>
          <div className="arrow left" />
        </li>

        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li key={pageNumber}  className="pagination-item dots">&#8230;</li>;
          }

          return (
            <li
              key={pageNumber}
              className={classnames('pagination-item', { selected: pageNumber === currentPage })}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}

        <li className={classnames('pagination-item', { disabled: currentPage === lastPage })} onClick={onNext}>
          <div className="arrow right" />
        </li>
      </ul>

      <div className="paginationgoto">
        <input
          type="number"
          placeholder="Go to Page"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
          min="1"
          max={lastPage}
          
        />
        <button onClick={goToPage}>Go</button>
      </div>
    </div>
  );
};

export default Pagination;
