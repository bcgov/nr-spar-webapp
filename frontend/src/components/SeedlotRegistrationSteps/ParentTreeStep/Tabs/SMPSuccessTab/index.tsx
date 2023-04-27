/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {
  FlexGrid,
  Row,
  Column,
  InlineNotification,
  TextInput,
  Button,
  Checkbox,
  OverflowMenu,
  OverflowMenuItem,
  DataTable,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Pagination
} from '@carbon/react';
import { Upload, View, Settings } from '@carbon/icons-react';

import Subtitle from '../../../../Subtitle';
import UploadFileModal from '../../UploadFileModal';
import paginationOnChange from '../../../../../utils/PaginationUtils';

import { pageTexts } from '../../constants';
import {
  ControlFiltersType,
  GeneticTraitsType,
  ParentTreesIdType
} from '../../definitions';
import { getGeneticWorths } from '../../utils';

import '../styles.scss';

type TableHeaders = {
  key: string;
  header: string;
}

type TableRows = {
  id: string;
}

interface SMPSuccessTabProps {
  parentTrees: Array<ParentTreesIdType>;
  species: string;
}

interface ParentTreeDataTableProps {
  rows: Array<TableRows>;
  headers: Array<TableHeaders>;
}

const SMPSuccessTab = ({ parentTrees, species }: SMPSuccessTabProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const geneticTraits:Array<GeneticTraitsType> = getGeneticWorths(species);
  const [filterControl, setFilterControl] = useState<ControlFiltersType>(() => {
    const returnObj = {};
    geneticTraits.forEach((trait) => {
      (returnObj as ControlFiltersType)[trait.code] = false;
    });
    return returnObj;
  });

  const handleFilters = (
    event: React.ChangeEvent<HTMLInputElement>,
    geneticTrait: string
  ) => {
    const { checked } = event.target;
    setFilterControl({
      ...filterControl,
      [geneticTrait]: checked
    });
  };

  const parentTreeHeaders:Array<TableHeaders> = [
    {
      key: '1',
      header: 'Clone number'
    },
    {
      key: '2',
      header: 'SMP success on parent (%)'
    },
    {
      key: '3',
      header: 'Non-orchard pollen contam. (%)'
    }
  ];

  const [firstRowIndex, setFirstRowIndex] = useState<number>(0);
  const [currentPageSize, setCurrentPageSize] = useState<number>(40);

  return (
    <FlexGrid className="parent-tree-tabs">
      <Row className="title-row">
        <Column sm={4} md={5} lg={9}>
          <h2>{pageTexts.tabTitles.smpTab}</h2>
          <Subtitle text={pageTexts.smpSuccess.subtitle} />
        </Column>
      </Row>
      <Row className="notification-row">
        <InlineNotification
          lowContrast
          kind="info"
          aria-label={pageTexts.sharedTabTexts.notification.actionButtonLabel}
          subtitle={pageTexts.smpSuccess.notification.subtitle}
          title={pageTexts.sharedTabTexts.notification.title}
        />
      </Row>
      <Row className="parent-tree-table-row">
        <DataTable
          rows={parentTrees.slice(firstRowIndex, firstRowIndex + currentPageSize)}
          headers={parentTreeHeaders}
        >
          {({
            rows,
            headers
          }: ParentTreeDataTableProps) => (
            <TableContainer
              title={pageTexts.tabTitles.smpTab}
              description={pageTexts.smpSuccess.tableSubtitle}
            >
              <TableToolbar>
                <TableToolbarContent>
                  <OverflowMenu
                    aria-label="Show/Hide columns"
                    renderIcon={View}
                    menuOptionsClass="parent-tree-view-options"
                    iconDescription="Show/Hide columns"
                    flipped
                  >
                    <p className="view-options-separator">
                      Show breeding values
                    </p>
                    {geneticTraits.map((trait) => (
                      <Checkbox
                        key={`checkbox-trait-${trait.code}`}
                        id={`checkbox-trait-${trait.code}`}
                        name={`checkbox-trait-${trait.code}`}
                        className="breeding-value-checkbox"
                        labelText={trait.filterLabel}
                        defaultChecked={filterControl[trait.code]}
                        value={filterControl[trait.code]}
                        onChange={
                          (e: React.ChangeEvent<HTMLInputElement>) => handleFilters(e, trait.code)
                        }
                      />
                    ))}
                  </OverflowMenu>
                  <OverflowMenu
                    aria-label="More options"
                    renderIcon={Settings}
                    menuOptionsClass="parent-tree-table-options"
                    iconDescription="More options"
                  >
                    <OverflowMenuItem
                      itemText="Download table template"
                    />
                    <OverflowMenuItem
                      itemText="Export table as PDF file"
                    />
                    <OverflowMenuItem
                      itemText="Clean table data"
                    />
                  </OverflowMenu>
                  <Button
                    onClick={() => setOpen(true)}
                    size="sm"
                    kind="primary"
                    renderIcon={Upload}
                    iconDescription="Upload file"
                  >
                    Upload from file
                  </Button>
                  {open && ReactDOM.createPortal(
                    <UploadFileModal open={open} setOpen={setOpen} onSubmit={() => {}} />,
                    document.body
                  )}
                </TableToolbarContent>
              </TableToolbar>
              <Table useZebraStyles>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader
                        key={header.key}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                    {geneticTraits.map((trait) => (
                      filterControl[trait.code]
                      && (
                        <TableHeader
                          key={`header-trait-${trait.code}`}
                        >
                          {trait.filterLabel}
                        </TableHeader>
                      )
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, i) => (
                    <TableRow key={(row.id + i).toString()}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                        <input type="number" className="table-input" placeholder="Add value" />
                      </TableCell>
                      <TableCell>
                        <input type="number" className="table-input" placeholder="Add value" />
                      </TableCell>
                      {geneticTraits.map((trait) => (
                        filterControl[trait.code]
                        && (
                          <TableCell
                            key={`cell-trait-${trait.code}-${(row.id + i).toString()}`}
                          >
                            <input type="number" className="table-input" placeholder="Add value" />
                          </TableCell>
                        )
                      ))}
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
      <Row className="title-row">
        <Column sm={4} md={5} lg={9}>
          <h2>{pageTexts.smpSuccess.summary.title}</h2>
          <Subtitle text={pageTexts.smpSuccess.summary.subtitle} />
        </Column>
      </Row>
      <Row className="summary-row">
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="totalParentTreesSMPSuccess"
            labelText={pageTexts.smpSuccess.summary.fieldLabels.totalParentTrees}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="averageSMPSuccess"
            labelText={pageTexts.smpSuccess.summary.fieldLabels.averageSMPSuccess}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="averageNonOrchard"
            labelText={pageTexts.smpSuccess.summary.fieldLabels.averageNonOrchard}
            readOnly
          />
        </Column>
      </Row>
      <Row className="title-row">
        <Column sm={4} md={5} lg={9}>
          <h2>{pageTexts.sharedTabTexts.geneticWorth.title}</h2>
          <Subtitle text={pageTexts.sharedTabTexts.geneticWorth.subtitle} />
        </Column>
      </Row>
      <Row className="genetic-row">
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="populationSize"
            labelText={pageTexts.sharedTabTexts.geneticWorth.defaultFieldsLabels.populationSize}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="testedParentTree"
            labelText={pageTexts.sharedTabTexts.geneticWorth.defaultFieldsLabels.testedParentTree}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="coancestry"
            labelText={pageTexts.sharedTabTexts.geneticWorth.defaultFieldsLabels.coancestry}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="smpParents"
            labelText={pageTexts.sharedTabTexts.geneticWorth.defaultFieldsLabels.smpParents}
            readOnly
          />
        </Column>
      </Row>
      <Row className="traits-row">
        {geneticTraits.map((trait) => (
          <Column key={`column-trait-${trait.code}`} sm={2} md={4} lg={4}>
            <TextInput
              id={`input-trait-${trait.code}`}
              labelText={trait.description}
              readOnly
            />
          </Column>
        ))}
      </Row>
    </FlexGrid>
  );
};

export default SMPSuccessTab;
