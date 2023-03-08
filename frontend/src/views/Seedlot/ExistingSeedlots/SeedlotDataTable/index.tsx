import React, { useState } from 'react';
import { hashObject } from 'react-hash-string';

import { 
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Pagination,
  Search
} from '@carbon/react';

import './styles.css';

import { headerData, rowData } from './data';
import StatusItem from '../../../../components/StatusItem';
import Participants from '../../../../components/Participants';
import formatDate from '../../../../utils/DateUtils';

interface HeaderType {
  key: string,
  header: string
}

interface DataTableInterface {
  headers: HeaderType[],
  onInputChange: any,
  rows: any,
  getHeaderProps: any,
  getTableProps: any,
}
interface RowInterface {
  cells: any,
}

const SeedlotDataTable = () => {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(20);

  return(
  <>
    <DataTable 
      rows={rowData.slice(firstRowIndex, firstRowIndex + currentPageSize)} 
      headers={headerData}
      isSortable
    >
      {({ rows, headers, onInputChange, getHeaderProps, getTableProps}:DataTableInterface) => (
      <TableContainer>
        <Search onChange={onInputChange} placeholder="Search for seedlots" />
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>   
              {headers.map((header:HeaderType) => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((item:RowInterface) => (
          <TableRow key={hashObject(item.cells)}>
            <TableCell>{item.cells[0].value}</TableCell>
            <TableCell>{`${item.cells[1].value} class`}</TableCell>
            <TableCell>{item.cells[2].value}</TableCell>
            <TableCell>{item.cells[3].value}</TableCell>
            <TableCell>
              <StatusItem status={item.cells[4].value} />
            </TableCell>
            <TableCell>
              <Participants elements={item.cells[5].value} number={item.cells[0].value} />
            </TableCell>
            <TableCell>{formatDate(item.cells[6].value)}</TableCell>
            <TableCell>{formatDate(item.cells[7].value)}</TableCell>
            <TableCell>{formatDate(item.cells[8].value)}</TableCell>
          </TableRow>
        ))}
          </TableBody>
        </Table>
      </TableContainer>
      )}
    </DataTable>
    <Pagination
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText=""
        page={1}
        pageNumberText="Page Number"
        pageSize={currentPageSize}
        pageSizes={[ 10, 20, 30, 40, 50]}
        totalItems={rowData.length}
        onChange={({ page, pageSize }:{page: number, pageSize: number}) => {
          if (pageSize !== currentPageSize) {
            setCurrentPageSize(pageSize);
          }
          setFirstRowIndex(pageSize * (page - 1));
        }}
      />
    </>
)};

export default SeedlotDataTable;
