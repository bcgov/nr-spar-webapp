import React, { useEffect, useRef, useState } from 'react';
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

import { SMPSuccessType } from '../../../../../types/SeedlotTypes/ParentTree';

import { pageTexts, smpSuccessFixedFilters, smpSuccessFixedHeaders } from '../../constants';
import {
  ControlFiltersType,
  GeneticTraitsType,
  ParentTreesType
} from '../../definitions';
import {
  createEmptySMPSuccess,
  createRandomSMPSuccess,
  getGeneticWorths,
  useIsMount
} from '../../utils';

import '../styles.scss';

interface SMPSuccessTabProps {
  parentTrees: Array<ParentTreesType>;
  species: string;
  orchards: string[];
}

const SMPSuccessTab = ({ parentTrees, species, orchards }: SMPSuccessTabProps) => {
  const isMount = useIsMount();

  const [firstRowIndex, setFirstRowIndex] = useState<number>(0);
  const [currentPageSize, setCurrentPageSize] = useState<number>(40);

  const [controlBulk, setControlBulk] = useState<boolean>(false);

  const [smpSuccessData, setSMPSuccessData] = useState<SMPSuccessType>(
    createEmptySMPSuccess(parentTrees)
  );

  const [open, setOpen] = useState<boolean>(false);
  const paginationOnChange = async (pageSize: number, page: number) => {
    if (pageSize !== currentPageSize) {
      setCurrentPageSize(pageSize);
    }
    setFirstRowIndex(pageSize * (page - 1));
  };

  const geneticTraits:Array<GeneticTraitsType> = getGeneticWorths(species);

  const [filterControl, setFilterControl] = useState<ControlFiltersType>(() => {
    const returnObj = {};
    geneticTraits.forEach((trait) => {
      (returnObj as ControlFiltersType)[trait.code] = false;
    });
    smpSuccessFixedFilters.forEach((meanFilter) => {
      (returnObj as ControlFiltersType)[meanFilter.description] = false;
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

  const refControl = useRef<any>({});
  const addRefs = (element: HTMLInputElement, name: string) => {
    if (element !== null) {
      refControl.current = {
        ...refControl.current,
        [name]: element
      };
    }
  };

  const fillTableAndResults = (
    smpSuccess: SMPSuccessType,
    tableOnly?: boolean,
    bulkField?: string
  ) => {
    smpSuccess.smpSuccessEntries.forEach((element) => {
      // We have a possible cenario with 2 orchards with the same parent tree ID
      // so we need combine the parent tree ID with the orchard ID to get the
      // unique value used on the inputs
      orchards.forEach((orchard) => {
        const indexParentIdCombination = `${(element.cloneNumber.toString())}-${orchard}`;

        if (!bulkField) {
          const inputSuccess = `inputSuccess-${indexParentIdCombination}`;
          const inputNonOrchard = `inputNonOrchard-${indexParentIdCombination}`;

          // Check if the current cloneNumber exists in that orchard before trying
          // to change the input's value
          if (refControl.current[inputSuccess] && refControl.current[inputNonOrchard]) {
            refControl.current[inputSuccess].value = element.successOnParent;
            refControl.current[inputNonOrchard].value = element.nonOrchardPollenContam;
          }
        } else {
          // Set the value only on the field that changed
          const input = `${bulkField}-${indexParentIdCombination}`;
          if (refControl.current[input]) {
            if (bulkField === 'inputSuccess') {
              refControl.current[input].value = element.successOnParent;
            } else {
              refControl.current[input].value = element.nonOrchardPollenContam;
            }
          }
        }
      });
    });

    if (!tableOnly) {
      geneticTraits.forEach((genTrait) => {
        const genTraitInputRef = `inputTraitResult-${genTrait.code}`;
        const totalGenTraitKey = `${genTrait.code}Total`;
        refControl.current[genTraitInputRef].value = smpSuccess.geneticWorth[totalGenTraitKey];
      });

      // Other inputs are manual...
      refControl.current.totalParentTreesSMPSuccess.value = smpSuccess.totalParentTreesSMPSuccess;
      refControl.current.averageSMPSuccess.value = smpSuccess.averageNumberSMPSuccess;
      refControl.current.averageNonOrchard.value = smpSuccess.averageNonOrchardPollenContam;
      refControl.current.populationSize.value = smpSuccess.geneticWorth.populationSize;
      refControl.current.testedParentTree.value = smpSuccess.geneticWorth.testedParentTree;
      refControl.current.coancestry.value = smpSuccess.geneticWorth.coancestry;
      refControl.current.smpParents.value = smpSuccess.geneticWorth.smpParents;
    }
  };

  // This function will be altered once the real API is connected
  const testSubmit = () => {
    setSMPSuccessData(createRandomSMPSuccess(parentTrees));
    fillTableAndResults(smpSuccessData);
  };

  const handleBulkChange = (field: string, value: string) => {
    const smpSuccessTemp: SMPSuccessType = smpSuccessData;

    smpSuccessTemp.smpSuccessEntries.forEach((element) => {
      if (field === 'inputSuccess') {
        // eslint-disable-next-line no-param-reassign
        element.successOnParent = +value;
      } else {
        // eslint-disable-next-line no-param-reassign
        element.nonOrchardPollenContam = +value;
      }
    });

    setSMPSuccessData(smpSuccessTemp);
    fillTableAndResults(smpSuccessData, true, field);
  };

  useEffect(() => {
    if (!isMount) {
      fillTableAndResults(smpSuccessData);
    }
  }, [smpSuccessData, currentPageSize]);

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
      <Row className={controlBulk ? 'bulk-control-row-active' : 'bulk-control-row'}>
        <Checkbox
          id="bulk-uptdate-table"
          name="bulk-uptdate-table"
          labelText={pageTexts.smpSuccess.bulkCheckboxLabel}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setControlBulk(e.target.checked)}
        />
      </Row>
      {
        controlBulk
        && (
          <Row className="bulk-update-row">
            <Column sm={2} md={4} lg={4}>
              <TextInput
                name="bulk-update-smp-success"
                id="bulk-update-smp-success"
                type="number"
                labelText={pageTexts.smpSuccess.bulkSuccessInputLabel}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleBulkChange('inputSuccess', e.target.value);
                }}
              />
            </Column>
            <Column sm={2} md={4} lg={4}>
              <TextInput
                name="bulk-update-non-orchard"
                id="bulk-update-non-orchard"
                type="number"
                labelText={pageTexts.smpSuccess.bulkNonOrchardInputLabel}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleBulkChange('inputNonOrchard', e.target.value);
                }}
              />
            </Column>
          </Row>
        )
      }
      <Row className="parent-tree-table-row">
        <TableContainer
          title={pageTexts.tabTitles.smpTab}
          description={pageTexts.smpSuccess.tableSubtitle}
        >
          <TableToolbar>
            <TableToolbarContent>
              <OverflowMenu
                aria-label={pageTexts.sharedTabTexts.overflowMenus.columnsOverflow}
                renderIcon={View}
                menuOptionsClass="parent-tree-view-options"
                iconDescription={pageTexts.sharedTabTexts.overflowMenus.columnsOverflow}
                flipped
              >
                <p className="view-options-separator">
                  {pageTexts.sharedTabTexts.overflowMenus.smpMixUsed}
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
                {smpSuccessFixedFilters.map((filter) => (
                  <Checkbox
                    key={`checkbox-${filter.code}`}
                    id={`checkbox-${filter.code}`}
                    name={`checkbox-${filter.code}`}
                    className="mean-filters-checkbox"
                    labelText={filter.description}
                    defaultChecked={filterControl[filter.code]}
                    value={filterControl[filter.code]}
                    onChange={
                      (e: React.ChangeEvent<HTMLInputElement>) => handleFilters(e, filter.code)
                    }
                  />
                ))}
              </OverflowMenu>
              <OverflowMenu
                aria-label={pageTexts.sharedTabTexts.overflowMenus.optionsOverflow}
                renderIcon={Settings}
                menuOptionsClass="parent-tree-table-options"
                iconDescription={pageTexts.sharedTabTexts.overflowMenus.optionsOverflow}
              >
                <OverflowMenuItem
                  itemText={pageTexts.sharedTabTexts.overflowMenus.downloadTable}
                />
                <OverflowMenuItem
                  itemText={pageTexts.sharedTabTexts.overflowMenus.exportPdf}
                />
                <OverflowMenuItem
                  itemText={pageTexts.sharedTabTexts.overflowMenus.cleanTable}
                />
              </OverflowMenu>
              <Button
                onClick={() => setOpen(true)}
                size="sm"
                kind="primary"
                renderIcon={Upload}
                iconDescription={pageTexts.sharedTabTexts.uploadButtonIconDesc}
              >
                {pageTexts.sharedTabTexts.uploadButtonLabel}
              </Button>
              {open && ReactDOM.createPortal(
                <UploadFileModal open={open} setOpen={setOpen} onSubmit={testSubmit} />,
                document.body
              )}
            </TableToolbarContent>
          </TableToolbar>
          <Table useZebraStyles>
            <TableHead>
              <TableRow>
                {smpSuccessFixedHeaders.map((header) => (
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
                {smpSuccessFixedFilters.map((filter) => (
                  filterControl[filter.code]
                  && (
                    <TableHeader
                      key={`header-${filter.code}`}
                    >
                      {filter.description}
                    </TableHeader>
                  )
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {parentTrees.slice(firstRowIndex, firstRowIndex + currentPageSize).map((row, i) => (
                <TableRow key={row.id}>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>
                    <input
                      ref={(el: HTMLInputElement) => addRefs(el, `inputSuccess-${(row.id)}`)}
                      type="number"
                      className="table-input"
                      placeholder={pageTexts.sharedTabTexts.tableInputPlaceholder}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      ref={(el: HTMLInputElement) => addRefs(el, `inputNonOrchard-${(row.id)}`)}
                      type="number"
                      className="table-input"
                      placeholder={pageTexts.sharedTabTexts.tableInputPlaceholder}
                    />
                  </TableCell>
                  {geneticTraits.map((trait) => (
                    filterControl[trait.code]
                    && (
                      <TableCell
                        key={`cell-trait-${trait.code}-${(row.id + i).toString()}`}
                      >
                        {smpSuccessData.smpSuccessEntries[i][trait.code]}
                      </TableCell>
                    )
                  ))}
                  {smpSuccessFixedFilters.map((filter) => (
                    filterControl[filter.code]
                    && (
                      <TableCell
                        key={`cell-${filter.code}-${(row.id + i).toString()}`}
                      >
                        {smpSuccessData.smpSuccessEntries[i][filter.code]}
                      </TableCell>
                    )
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          className="table-pagination"
          backwardText={pageTexts.sharedTabTexts.pagination.previous}
          forwardText={pageTexts.sharedTabTexts.pagination.next}
          itemsPerPageText=""
          page={1}
          pageNumberText={pageTexts.sharedTabTexts.pagination.pageNumber}
          pageSize={currentPageSize}
          pageSizes={[20, 40, 60, 80, 100]}
          totalItems={parentTrees.length}
          onChange={({ page, pageSize }:{page: number, pageSize: number}) => {
            paginationOnChange(
              pageSize,
              page
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
            ref={(el: HTMLInputElement) => addRefs(el, 'totalParentTreesSMPSuccess')}
            labelText={pageTexts.smpSuccess.summary.fieldLabels.totalParentTrees}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="averageSMPSuccess"
            ref={(el: HTMLInputElement) => addRefs(el, 'averageSMPSuccess')}
            labelText={pageTexts.smpSuccess.summary.fieldLabels.averageSMPSuccess}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="averageNonOrchard"
            ref={(el: HTMLInputElement) => addRefs(el, 'averageNonOrchard')}
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
              id={`input-trait-${trait.code}`}
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

export default SMPSuccessTab;
