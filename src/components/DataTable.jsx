import * as React from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel
} from "@tanstack/react-table";
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'

// export type DataTableProps<Data extends object> = {
//   data: Data[];
//   columns: ColumnDef<Data, any>[];
//   showPagination?: boolean
// };

export default function DataTable({ data, columns }) {
  const [sorting, setSorting] = React.useState([]);
  // const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
  //   pageIndex: 0,
  //   pageSize: 5,
  // })

  // const pagination = React.useMemo(
  //   () => ({
  //     pageIndex,
  //     pageSize,
  //   }),
  //   [pageIndex, pageSize]
  // );

  const table = useReactTable({
    columns,
    // manualPagination: true,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    // pageCount: Math.round(data.length / pageSize) ?? -1,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    state: {
      sorting,
      // pagination
    }
  });

  return (
    <div className="w-full">
      {table.getRowModel().rows.length === 0 ? (
        <div className="font-bold text-center text-lg w-full py-5">
          No Data found
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const meta = header.column.columnDef.meta;
                      return (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                        // isNumeric={meta?.isNumeric}
                        >
                          <div className="flex items-center">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}

                            <span>
                              {header.column.getIsSorted() ? (
                                header.column.getIsSorted() === "desc" ? (
                                  <BsArrowDown aria-label="sorted descending" />
                                ) : (
                                  <BsArrowUp aria-label="sorted ascending" />
                                )
                              ) : null}
                            </span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const meta = cell.column.columnDef.meta;
                      return (
                        <td
                          key={cell.id}
                          isNumeric={meta?.isNumeric}
                          style={{ width: cell.column.getSize() }}
                          className="text-left font-bold text-sm"
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* {
            showPagination && <div className="flex lg:flex-row flex-col justify-between items-center w-full px-5 py-3 border-gray-100 border-t-2">
              <span className="text-sm font-semibold py-3">
                Showing {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} pages
              </span>
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center mr-2">
                  <span className="text-sm font-semibold mx-3">Go to page: </span>
                  <input
                    className="py-1 rounded-md px-2 border-2 border-gray-300 focus:outline-none"
                    type="number"
                    defaultValue={table.getState().pagination.pageIndex + 1}
                    onChange={e => {
                      const page = e.target.value ? Number(e.target.value) - 1 : 0;
                      table.setPageIndex(page)
                    }}
                    style={{ width: '40px' }}
                  />
                </div>
                <div className="flex flex-row items-center py-3 ml-1">
                  <span className="text-sm font-semibold mx-3">Rows per page: </span>
                  <select
                    className="p-1 rounded-md border-2 border-gray-300 text-sm"
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                      table.setPageSize(Number(e.target.value));
                    }}
                  >
                    {[2, 5, 20, 30, 40, 50].map(pageSize => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-row py-3">
                <button
                  className={!table.getCanPreviousPage() ? `cursor-not-allowed opacity-50 focus:outline-none h-7 w-7 mx-2 
                rounded-md text-white hover:text-white 
                flex justify-center items-center bg-blue-900 hover:bg-blue-900` : `
                focus:outline-none h-7 w-7 mx-2 rounded-md text-white hover:text-white 
                flex justify-center items-center bg-blue-900 hover:bg-blue-900
              `}
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}>
                  <FaAngleDoubleLeft fontSize="11px" />
                </button>
                <button
                  className={!table.getCanPreviousPage() ? `cursor-not-allowed opacity-50 focus:outline-none h-7 w-7 mx-2 
                rounded-md text-white hover:text-white 
                flex justify-center items-center bg-blue-900 hover:bg-blue-900` : `
                focus:outline-none h-7 w-7 mx-2 rounded-md text-white hover:text-white 
                flex justify-center items-center bg-blue-900 hover:bg-blue-900
              `}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}>
                  <FaAngleLeft fontSize="11px" />
                </button>
                <button
                  className={!table.getCanNextPage() ? `cursor-not-allowed opacity-50 focus:outline-none h-7 w-7 mx-2 
                rounded-md text-white hover:text-white 
                flex justify-center items-center bg-blue-900 hover:bg-blue-900` : `
                focus:outline-none h-7 w-7 mx-2 rounded-md text-white hover:text-white 
                flex justify-center items-center bg-blue-900 hover:bg-blue-900
              `
                  }
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}>
                  <FaAngleRight fontSize="11px" />
                </button>
                <button
                  className={!table.getCanNextPage() ? `cursor-not-allowed opacity-50 focus:outline-none h-7 w-7 mx-2 
              rounded-md text-white hover:text-white 
              flex justify-center items-center bg-blue-900 hover:bg-blue-900` : `
              focus:outline-none h-7 w-7 mx-2 rounded-md text-white hover:text-white 
              flex justify-center items-center bg-blue-900 hover:bg-blue-900
            `}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}>
                  <FaAngleDoubleRight fontSize="11px" />
                </button>
              </div>
            </div>
          } */}
        </>
      )}
    </div>
  )
}