/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
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

import Subtitle from '../../../../Subtitle';
import UploadFileModal from '../../UploadFileModal';

import paginationOnChange from '../../../../../utils/PaginationUtils';

import api from '../../../../../api-service/api';
import ApiConfig from '../../../../../api-service/ApiConfig';

import { ConeAndPollenType } from '../../../../../types/SeedlotTypes/ParentTree';

import { coneAndPollenFixedHeaders, pageTexts } from '../../constants';

import {
  ControlFiltersType,
  GeneticTraitsType,
  ParentTreesIdType,
  TableHeaders,
  TableRows
} from '../../definitions';

import { createEmptyConeAndPollen, getGeneticWorths } from '../../utils';

import '../styles.scss';

interface ConeAndPollenTabProps {
  parentTrees: Array<ParentTreesIdType>;
}

interface ParentTreeDataTableProps {
  rows: Array<TableRows>;
  headers: Array<TableHeaders>;
}

const ConeAndPollenTab = ({ parentTrees }: ConeAndPollenTabProps) => {
  const { seedlot } = useParams();
  const [seedlotSpecie, setSeedlotSpecie] = useState<string>('');
  const [firstRowIndex, setFirstRowIndex] = useState<number>(0);
  const [currentPageSize, setCurrentPageSize] = useState<number>(40);
  const [open, setOpen] = useState<boolean>(false);

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

  const geneticTraits:Array<GeneticTraitsType> = getGeneticWorths(seedlotSpecie);
  const coneAndPollenData: ConeAndPollenType = createEmptyConeAndPollen(parentTrees);

  const refControl = useRef<any>({});
  const addRefs = (element: HTMLInputElement, name: string) => {
    if (element !== null) {
      refControl.current = {
        ...refControl.current,
        [name]: element
      };
    }
  };

  const fillTableAndResults = (coneAndPollen: ConeAndPollenType) => {
    coneAndPollen.coneAndPollenEntries.forEach((element, index) => {
      // We have a possible cenario with 2 orchards with the same parent tree ID
      // so we need combine the parent tree ID with the mapping index to have an
      // unique identifier
      const indexParentIdCombination = `${(element.cloneNumber.toString() + index.toString())}`;

      const inputCone = `inputCone-${indexParentIdCombination}`;
      const inputPollen = `inputPollen-${indexParentIdCombination}`;
      const inputSMP = `inputSMP-${indexParentIdCombination}`;

      refControl.current[inputCone].value = element.coneCount;
      refControl.current[inputPollen].value = element.pollenCount;
      refControl.current[inputSMP].value = element.smpSuccess;

      geneticTraits.forEach((genTrait) => {
        const genTraitInputRef = `inputTrait-${genTrait.code}-${indexParentIdCombination}`;
        refControl.current[genTraitInputRef].value = element[genTrait.code];
      });
    });

    geneticTraits.forEach((genTrait) => {
      const genTraitInputRef = `inputTraitResult-${genTrait.code}`;
      const totalGenTraitKey = `${genTrait.code}Total`;
      refControl.current[genTraitInputRef].value = coneAndPollen.genTraitTotal[totalGenTraitKey];
    });

    // Other inputs are manual...
    // eslint-disable-next-line max-len
    refControl.current.totalParentTreesConeAndPollen.value = coneAndPollen.totalParentTreesConeAndPollen;
    refControl.current.totalConeCount.value = coneAndPollen.totalConeCount;
    refControl.current.totalPollenCount.value = coneAndPollen.totalPollenCount;
    refControl.current.averageSMP.value = coneAndPollen.averageSMP;
    refControl.current.populationSize.value = coneAndPollen.populationSize;
    refControl.current.testedParentTree.value = coneAndPollen.testedParentTree;
    refControl.current.coancestry.value = coneAndPollen.coancestry;
    refControl.current.smpParents.value = coneAndPollen.smpParents;
  };

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

  useEffect(() => {
    getSeedlotData();
    fillTableAndResults(coneAndPollenData);
  }, []);

  return (
    <FlexGrid className="parent-tree-tabs">
      <Row className="title-row">
        <Column sm={4} md={5} lg={9}>
          <h2>{pageTexts.tabTitles.coneTab}</h2>
          <Subtitle text={pageTexts.coneAndPollen.subtitle} />
        </Column>
      </Row>
      <Row className="notification-row">
        <InlineNotification
          lowContrast
          kind="info"
          aria-label={pageTexts.sharedTabTexts.notification.actionButtonLabel}
          subtitle={pageTexts.coneAndPollen.notification.subtitle}
          title={pageTexts.sharedTabTexts.notification.title}
        />
      </Row>
      <Row className="parent-tree-table-row">
        <DataTable
          rows={parentTrees.slice(firstRowIndex, firstRowIndex + currentPageSize)}
          headers={coneAndPollenFixedHeaders}
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
                    onClick={() => setOpen(true)}
                    size="sm"
                    kind="primary"
                    renderIcon={Upload}
                    iconDescription="Upload file"
                  >
                    Upload from file
                  </Button>
                  {open && ReactDOM.createPortal(
                    <UploadFileModal open={open} setOpen={setOpen} />,
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
                        <input
                          ref={(el: HTMLInputElement) => addRefs(el, `inputCone-${(row.id + i).toString()}`)}
                          type="number"
                          className="table-input"
                          placeholder="Add value"
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          ref={(el: HTMLInputElement) => addRefs(el, `inputPollen-${(row.id + i).toString()}`)}
                          type="number"
                          className="table-input"
                          placeholder="Add value"
                        />
                      </TableCell>
                      <TableCell>
                        <input
                          ref={(el: HTMLInputElement) => addRefs(el, `inputSMP-${(row.id + i).toString()}`)}
                          type="number"
                          className="table-input"
                          placeholder="Add value"
                        />
                      </TableCell>
                      {
                        // This is not dinamically rendered because we need the reference
                        // of the inputs to set the values on them
                        geneticTraits.map((trait) => (
                          <TableCell
                            key={`cell-trait-${trait.code}-${(row.id + i).toString()}`}
                            className={filterControl[trait.code] ? '' : 'parent-tree-hide'}
                          >
                            <input
                              ref={(el: HTMLInputElement) => addRefs(el, `inputTrait-${trait.code}-${(row.id + i).toString()}`)}
                              type="number"
                              className="table-input"
                              placeholder="Add value"
                            />
                          </TableCell>
                        ))
                      }
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
          <h2>{pageTexts.coneAndPollen.summary.title}</h2>
          <Subtitle text={pageTexts.coneAndPollen.summary.subtitle} />
        </Column>
      </Row>
      <Row className="summary-row">
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="totalParentTreesConeAndPollen"
            ref={(el: HTMLInputElement) => addRefs(el, 'totalParentTreesConeAndPollen')}
            labelText={pageTexts.coneAndPollen.summary.fieldLabels.totalParentTrees}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="totalConeCount"
            ref={(el: HTMLInputElement) => addRefs(el, 'totalConeCount')}
            labelText={pageTexts.coneAndPollen.summary.fieldLabels.totalConeCount}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="totalPollenCount"
            ref={(el: HTMLInputElement) => addRefs(el, 'totalPollenCount')}
            labelText={pageTexts.coneAndPollen.summary.fieldLabels.totalPollenCount}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="averageSMP"
            ref={(el: HTMLInputElement) => addRefs(el, 'averageSMP')}
            labelText={pageTexts.coneAndPollen.summary.fieldLabels.averageSMP}
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
            ref={(el: HTMLInputElement) => addRefs(el, 'populationSize')}
            labelText={pageTexts.sharedTabTexts.geneticWorth.defaultFieldsLabels.populationSize}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="testedParentTree"
            ref={(el: HTMLInputElement) => addRefs(el, 'testedParentTree')}
            labelText={pageTexts.sharedTabTexts.geneticWorth.defaultFieldsLabels.testedParentTree}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="coancestry"
            ref={(el: HTMLInputElement) => addRefs(el, 'coancestry')}
            labelText={pageTexts.sharedTabTexts.geneticWorth.defaultFieldsLabels.coancestry}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="smpParents"
            ref={(el: HTMLInputElement) => addRefs(el, 'smpParents')}
            labelText={pageTexts.sharedTabTexts.geneticWorth.defaultFieldsLabels.smpParents}
            readOnly
          />
        </Column>
      </Row>
      <Row className="traits-row">
        {geneticTraits.map((trait) => (
          <Column key={`column-trait-${trait.code}`} sm={2} md={4} lg={4}>
            <TextInput
              id={`input-trait-result-${trait.code}`}
              ref={(el: HTMLInputElement) => addRefs(el, `inputTraitResult-${trait.code}`)}
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
