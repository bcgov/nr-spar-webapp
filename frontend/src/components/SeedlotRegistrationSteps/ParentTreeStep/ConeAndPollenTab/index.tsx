/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

import Subtitle from '../../../Subtitle';
import paginationOnChange from '../../../../utils/PaginationUtils';

import api from '../../../../api-service/api';
import ApiConfig from '../../../../api-service/ApiConfig';

import { pageTexts } from '../constants';
import { ControlFiltersType, GeneticTraitsType } from '../definitions';
import getGeneticWorths from '../utils';

import './styles.scss';

type TableHeaders = {
  key: string;
  header: string;
  isObrigatory: boolean;
}

type TableRows = {
  id: string;
}

interface ParentTreeDataTableProps {
  rows: Array<TableRows>;
  headers: Array<TableHeaders>;
}

const ConeAndPollenTab = () => {
  const { seedlot } = useParams();

  const [seedlotSpecie, setSeedlotSpecie] = useState<string>('');

  const getSeedlotData = () => {
    if (seedlot) {
      const url = `${ApiConfig.seedlot}/${seedlot}`;
      api.get(url)
        .then((response) => {
          if (response.data.seedlotApplicantInfo) {
            setSeedlotSpecie(response.data.seedlotApplicantInfo.species.code);
          }
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(`Error: ${error}`);
        });
    }
  };

  useEffect(() => {
    getSeedlotData();
  }, []);

  const geneticTraits:Array<GeneticTraitsType> = getGeneticWorths(seedlotSpecie);
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
      header: 'Clone number',
      isObrigatory: true
    },
    {
      key: '2',
      header: 'Cone count',
      isObrigatory: true
    },
    {
      key: '3',
      header: 'Pollen count',
      isObrigatory: true
    },
    {
      key: '4',
      header: 'SMP success (%)',
      isObrigatory: true
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
                    onClick={() => alert('Alert 3')}
                    size="sm"
                    kind="primary"
                    renderIcon={Upload}
                    iconDescription="Upload file"
                  >
                    Upload from file
                  </Button>
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
                    {geneticTraits.map((trait) => (filterControl[trait.code]
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
                      <TableCell>
                        <input type="number" className="table-input" placeholder="Add value" />
                      </TableCell>
                      {geneticTraits.map((trait) => (filterControl[trait.code]
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

export default ConeAndPollenTab;
