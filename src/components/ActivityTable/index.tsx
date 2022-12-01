import React from 'react';

import './styles.css';

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell
} from '@carbon/react';
import { DataViewAlt } from '@carbon/icons-react';

import { hashObject } from 'react-hash-string';

import Activity from '../../types/Activity';


interface TableProps {
  elements: Activity[],
  clickFn: Function,
  headers: string[]
}

const ActivityTable = ({ elements, clickFn, headers }: TableProps) => {
  const loadingStatus = {
    loading: 'Deleting...',
    success: 'Deleted!',
    error: 'Error'
  };

  return (
    <Table size="lg" useZebraStyles={false}>
      <TableHead>
        <TableRow>
          {headers.map((header, idx) => (
            <TableHeader key={header} id={`header-${header}-${idx}`} data-testid={`header-${header}-${idx}`}>
              {header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {elements.map((item, idx) => (
          <TableRow key={hashObject(item)} id={`row${idx}`}>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.request_id}</TableCell>
            <TableCell>{item.created_at}</TableCell>
            <TableCell>{item.last_viewed}</TableCell>
            <TableCell>
              <a href='#'><DataViewAlt onClick={() => clickFn(item.request_id)} /></a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ActivityTable;
