import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { useTable, useSortBy, usePagination, useFlexLayout } from "react-table";
import ButtonImage from "./ButtonImage";
import { ReactComponent as ArrowLeftSVG } from "../assets/arrowLeft.svg";
import { ReactComponent as ArrowRightSVG } from "../assets/arrowRight.svg";
import { ReactComponent as ArrowUpSVG } from "../assets/arrowUp.svg";
import { ReactComponent as ArrowDownSVG } from "../assets/arrowDown.svg";

const Table = ({
  columns,
  data,
  onClickRow,
  autoResetPage,
  getRowProps,
  className,
}) => {
  const readOnly = onClickRow === undefined;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    { columns, data, autoResetPage },
    useSortBy,
    usePagination,
    useFlexLayout
  );

  const customOnClickRow = useCallback(
    (index) => {
      if (!readOnly) onClickRow(index, data[index]);
    },
    [data, readOnly]
  );

  return (
    <Styles className={className} readOnly={readOnly}>
      <div className="tableWrap">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <SortedTagSVG as={ArrowDownSVG} />
                      ) : (
                        <SortedTagSVG as={ArrowUpSVG} />
                      )
                    ) : (
                      ""
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps(getRowProps(page[i].index))}
                  onClick={() => {
                    customOnClickRow(page[i].index);
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination>
        <PaginationButton
          type="secondary"
          iconSVG={ArrowLeftSVG}
          onClick={() => {
            previousPage();
          }}
          disabled={!canPreviousPage}
        />
        <PageNumber>
          <strong>{pageIndex + 1}</strong> de {pageOptions.length}
        </PageNumber>
        <PaginationButton
          type="secondary"
          iconSVG={ArrowRightSVG}
          onClick={() => {
            nextPage();
          }}
          disabled={!canNextPage}
        />
      </Pagination>
    </Styles>
  );
};

Table.defaultProps = {
  columns: [],
  data: [],
  autoResetPage: false,
  onClickRow: undefined,
  getRowProps: () => {},
  className: undefined,
};

export default Table;

const Styles = styled.div`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;
  outline: 0;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    border-bottom: 1px solid #b8b8c5;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }

      ${(props) =>
        !props.readOnly &&
        css`
          cursor: pointer;
        `}
    }

    tbody > tr:hover {
      background-color: #eceff1;
      color: black;
    }

    th {
      font-size: 0.9em;
      font-weight: 700;
      border-right: 0 !important;

      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      word-break: break-word;

      :hover {
        background-color: #eceff1;
      }
    }

    th,
    td {
      margin: 0;
      padding: 15px;
      border-bottom: 1px solid #b8b8c5;
      border-right: 1px solid #b8b8c5;

      overflow-wrap: break-word;

      :last-child {
        border-right: 0;
      }

      .toRight {
        text-align: right;
      }
    }
  }
`;

const SortedTagSVG = styled.div`
  width: 10px;
  height: 10px;

  fill: #33c494;

  margin: 5px;
`;

const PaginationButton = styled(ButtonImage)`
  margin: 5px;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 15px 0px 30px 0px;
`;

const PageNumber = styled.div`
  font-size: 0.9em;
  margin: 0px 20px;
`;
