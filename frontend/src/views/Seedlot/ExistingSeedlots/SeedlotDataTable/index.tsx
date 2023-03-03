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
  TableToolbar,
  TableToolbarSearch,
  TableToolbarContent,
  Pagination
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
  getRowProps: any
}

const SeedlotDataTable = () => {
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(20);

  const currentRows = rowData.slice(firstRowIndex, firstRowIndex + currentPageSize)

  return(
  <>
    <DataTable 
      rows={rowData.slice(firstRowIndex, firstRowIndex + currentPageSize)} 
      headers={headerData}
    >
      {({ rows, headers, onInputChange, getHeaderProps, getTableProps, getRowProps}:DataTableInterface) => (
      <TableContainer>
        <TableToolbar>
          <TableToolbarContent>
            <TableToolbarSearch onChange={onInputChange} />
          </TableToolbarContent>  
        </TableToolbar>
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
          {currentRows.map((item) => (
          <TableRow key={hashObject(item)} >
            <TableCell>{item.number}</TableCell>
            <TableCell>{`${item.class} class`}</TableCell>
            <TableCell>{item.lot_species}</TableCell>
            <TableCell>{item.form_step}</TableCell>
            <TableCell>
              <StatusItem status={item.status} />
            </TableCell>
            <TableCell>
              <Participants elements={item.participants} number={item.number} />
            </TableCell>
            <TableCell>{formatDate(item.created_at)}</TableCell>
            <TableCell>{formatDate(item.last_modified)}</TableCell>
            <TableCell>{formatDate(item.approved_at)}</TableCell>
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
