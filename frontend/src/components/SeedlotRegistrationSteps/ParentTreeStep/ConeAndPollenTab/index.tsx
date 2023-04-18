/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { hashObject } from 'react-hash-string';
import {
  FlexGrid,
  Row,
  Column,
  InlineNotification,
  TextInput,
  Button,
  DataTable,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarMenu,
  TableToolbarAction,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Pagination
} from '@carbon/react';

import Subtitle from '../../../Subtitle';
import { pageTexts } from '../constants';

import paginationOnChange from '../../../../utils/PaginationUtils';

import './styles.scss';

type TableHeaders = {
  title: string;
}

type TableRows = {
  id: string;
}

interface ParentTreeDataTableProps {
  rows: Array<TableRows>;
  headers: Array<TableHeaders>;
}

const ConeAndPollenTab = () => {
  const parentTreeHeaders:Array<TableHeaders> = [
    {
      title: 'Clone number'
    },
    {
      title: 'Cone count'
    },
    {
      title: 'Pollen count'
    },
    {
      title: 'SMP success (%)'
    }
  ];
  const parentTrees:Array<TableRows> = [
    {
      id: '1'
    },
    {
      id: '2'
    },
    {
      id: '3'
    },
    {
      id: '4'
    },
    {
      id: '5'
    },
    {
      id: '6'
    },
    {
      id: '7'
    },
    {
      id: '8'
    },
    {
      id: '9'
    },
    {
      id: '10'
    },
    {
      id: '11'
    }
  ];

  const [firstRowIndex, setFirstRowIndex] = useState<number>(0);
  const [currentPageSize, setCurrentPageSize] = useState<number>(40);

  return (
    <FlexGrid className="cone-pollen-tab">
      <Row className="cone-pollen-title-row">
        <Column sm={4} md={5} lg={9}>
          <h2>{pageTexts.tabTitles.coneTab}</h2>
          <Subtitle text={pageTexts.coneAndPollen.subtitle} />
        </Column>
      </Row>
      <Row className="cone-pollen-notification-row">
        <InlineNotification
          lowContrast
          kind="info"
          actionButtonLabel={pageTexts.coneAndPollen.notification.actionButtonLabel}
          aria-label={pageTexts.coneAndPollen.notification.actionButtonLabel}
          subtitle={pageTexts.coneAndPollen.notification.subtitle}
          title={pageTexts.coneAndPollen.notification.title}
        />
      </Row>
      <Row className="cone-pollen-table-row">
        <DataTable
          rows={parentTrees.slice(firstRowIndex, firstRowIndex + currentPageSize)}
          headers={parentTreeHeaders}
        >
          {({
            rows,
            headers
          }: ParentTreeDataTableProps) => (
            <TableContainer
              title={pageTexts.tabTitles.coneTab}
              description={pageTexts.coneAndPollen.tableSubtitle}
            >
              <TableToolbar>
                <TableToolbarContent>
                  <TableToolbarMenu>
                    <TableToolbarAction onClick={() => alert('Alert 1')}>
                      Action 1
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Alert 2')}>
                      Action 2
                    </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Alert 3')}>
                      Action 3
                    </TableToolbarAction>
                  </TableToolbarMenu>
                  <Button
                    onClick={() => alert('Alert 3')}
                    size="small"
                    kind="primary"
                  >
                    Add new
                  </Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table useZebraStyles>
                <TableHead>
                  <TableRow>
                    {headers.map((header, i) => (
                      <TableHeader key={hashObject(i)}>
                        {header.title}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={hashObject(i)}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <input type="number" className="table-input" placeholder="Add value" />
                      </TableCell>
                      <TableCell>
                        <input type="number" className="table-input" placeholder="Add value" />
                      </TableCell>
                      <TableCell>
                        <input type="number" className="table-input" placeholder="Add value" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DataTable>
        <Pagination
          className="table-pagination"
          backwardText="Previous page"
          forwardText="Next page"
          itemsPerPageText=""
          page={1}
          pageNumberText="Page Number"
          pageSize={currentPageSize}
          pageSizes={[20, 40, 60, 80, 100]}
          totalItems={parentTrees.length}
          onChange={({ page, pageSize }:{page: number, pageSize: number}) => {
            paginationOnChange(
              pageSize,
              currentPageSize,
              page,
              setFirstRowIndex,
              setCurrentPageSize
            );
          }}
        />
      </Row>
      <Row className="cone-pollen-title-row">
        <Column sm={4} md={5} lg={9}>
          <h2>{pageTexts.coneAndPollen.summary.title}</h2>
          <Subtitle text={pageTexts.coneAndPollen.summary.subtitle} />
        </Column>
      </Row>
      <Row className="cone-pollen-summary-row">
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="totalParentTrees"
            labelText={pageTexts.coneAndPollen.summary.fieldLabels.totalParentTrees}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="totalConeCount"
            labelText={pageTexts.coneAndPollen.summary.fieldLabels.totalConeCount}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="totalPollenCount"
            labelText={pageTexts.coneAndPollen.summary.fieldLabels.totalPollenCount}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="averageSMP"
            labelText={pageTexts.coneAndPollen.summary.fieldLabels.averageSMP}
            readOnly
          />
        </Column>
      </Row>
      <Row className="cone-pollen-title-row">
        <Column sm={4} md={5} lg={9}>
          <h2>{pageTexts.coneAndPollen.geneticWorth.title}</h2>
          <Subtitle text={pageTexts.coneAndPollen.geneticWorth.subtitle} />
        </Column>
      </Row>
      <Row className="cone-pollen-genetic-row">
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="populationSize"
            labelText={pageTexts.coneAndPollen.geneticWorth.defaultFieldsLabels.populationSize}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="testedParentTree"
            labelText={pageTexts.coneAndPollen.geneticWorth.defaultFieldsLabels.testedParentTree}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="coancestry"
            labelText={pageTexts.coneAndPollen.geneticWorth.defaultFieldsLabels.coancestry}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="smpParents"
            labelText={pageTexts.coneAndPollen.geneticWorth.defaultFieldsLabels.smpParents}
            readOnly
          />
        </Column>
      </Row>
      <Row className="cone-pollen-traits-row">
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="populationSize"
            labelText={pageTexts.coneAndPollen.geneticWorth.defaultFieldsLabels.populationSize}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="testedParentTree"
            labelText={pageTexts.coneAndPollen.geneticWorth.defaultFieldsLabels.testedParentTree}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="coancestry"
            labelText={pageTexts.coneAndPollen.geneticWorth.defaultFieldsLabels.coancestry}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="smpParents"
            labelText={pageTexts.coneAndPollen.geneticWorth.defaultFieldsLabels.smpParents}
            readOnly
          />
        </Column>
      </Row>
    </FlexGrid>
  );
};

export default ConeAndPollenTab;
