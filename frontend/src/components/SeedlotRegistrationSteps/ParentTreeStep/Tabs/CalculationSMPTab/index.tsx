import React, { useState, useRef, useEffect } from 'react';
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
import {
  Upload,
  View,
  Settings,
  TrashCan,
  Add
} from '@carbon/icons-react';

import Subtitle from '../../../../Subtitle';
import UploadFileModal from '../../UploadFileModal';

import { SMPMixType } from '../../../../../types/SeedlotTypes/ParentTree';

import {
  smpMixFixedHeaders,
  pageTexts,
  getSMPEmptyRows,
  newSMPMixEntry
} from '../../constants';

import {
  ControlFiltersType,
  GeneticTraitsType,
  ParentTreesType
} from '../../definitions';

import {
  createEmptySMPMix,
  createRandomSMPMix,
  getGeneticWorths,
  useIsMount
} from '../../utils';

import '../styles.scss';

interface CalculationSMPTabProps {
  species: string;
}

const CalculationSMPTab = ({ species }: CalculationSMPTabProps) => {
  const isMount = useIsMount();

  const [tableRows, setTableRows] = useState<Array<ParentTreesType>>(getSMPEmptyRows());

  const [firstRowIndex, setFirstRowIndex] = useState<number>(0);
  const [currentPageSize, setCurrentPageSize] = useState<number>(20);

  const [smpMixData, setSMPMixData] = useState<SMPMixType>(
    createEmptySMPMix(tableRows)
  );

  const [open, setOpen] = useState<boolean>(false);
  const paginationOnChange = async (pageSize: number, page: number) => {
    if (pageSize !== currentPageSize) {
      setCurrentPageSize(pageSize);
    }
    setFirstRowIndex(pageSize * (page - 1));
  };

  const geneticTraits: Array<GeneticTraitsType> = getGeneticWorths(species);

  const [filterControl, setFilterControl] = useState<ControlFiltersType>(() => {
    const returnObj = {};
    geneticTraits.forEach((trait) => {
      (returnObj as ControlFiltersType)[`${trait.code}-clonal`] = false;
      (returnObj as ControlFiltersType)[`${trait.code}-weighted`] = false;
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

  const fillTableAndResults = (smpMix: SMPMixType, tableOnly?: boolean) => {
    smpMix.smpMixEntries.forEach((element, index) => {
      const indexParentId = `${(index.toString())}`;

      const inputClone = `inputClone-${indexParentId}`;
      const inputVolume = `inputVolume-${indexParentId}`;
      const inputProportion = `inputProportion-${indexParentId}`;

      // Check if the current cloneNumber exists in that orchard before trying
      // to change the input's value
      if (
        refControl.current[inputClone]
        && refControl.current[inputVolume]
        && refControl.current[inputProportion]
      ) {
        refControl.current[inputClone].value = element.cloneNumber;
        refControl.current[inputVolume].value = element.volume;
        refControl.current[inputProportion].value = element.proportion;

        geneticTraits.forEach((genTrait) => {
          const genTraitClonalInputRef = `inputTraitClonal-${genTrait.code}-${indexParentId}`;
          const genTraitWeightedInputRef = `inputTraitWeighted-${genTrait.code}-${indexParentId}`;
          refControl.current[genTraitClonalInputRef].value = element[`${genTrait.code}Clonal`];
          refControl.current[genTraitWeightedInputRef].value = element[`${genTrait.code}Weighted`];
        });
      }
    });

    if (!tableOnly) {
      geneticTraits.forEach((genTrait) => {
        const genTraitInputRef = `inputTraitResult-${genTrait.code}`;
        const totalGenTraitKey = `${genTrait.code}Total`;
        refControl.current[genTraitInputRef].value = smpMix.geneticWorth[totalGenTraitKey];
      });

      // Other inputs are manual...
      // eslint-disable-next-line max-len
      refControl.current.smpParentTrees.value = smpMix.totalParentTreesFromOutside;
      refControl.current.totalVolume.value = smpMix.totalVolume;
    }
  };

  // These functions will be altered once the real API is connected
  const testSubmit = () => {
    setSMPMixData(createRandomSMPMix(tableRows));
    fillTableAndResults(smpMixData);
  };

  const handleTableChange = (
    field: string,
    value: string,
    index: number,
    genTrait: string = ''
  ) => {
    const smpMixTemp: SMPMixType = smpMixData;

    switch (field) {
      case 'inputClone':
        smpMixTemp.smpMixEntries[index].cloneNumber = +value;
        break;
      case 'inputVolume':
        smpMixTemp.smpMixEntries[index].volume = +value;
        break;
      case 'inputProportion':
        smpMixTemp.smpMixEntries[index].proportion = +value;
        break;
      case 'inputTraitClonal':
        smpMixTemp.smpMixEntries[index][`${genTrait}Clonal`] = +value;
        break;
      case 'inputTraitWeighted':
        smpMixTemp.smpMixEntries[index][`${genTrait}Weighted`] = +value;
        break;
      default:
        break;
    }
    setSMPMixData(smpMixTemp);
    // In the future, after this change, a recalculation will be necessary
  };

  const addNewRow = () => {
    setTableRows([
      ...tableRows,
      {
        id: `${(tableRows.length).toString()}`,
        value: ''
      }
    ]);
    setSMPMixData({
      ...smpMixData,
      smpMixEntries: [...smpMixData.smpMixEntries, newSMPMixEntry]
    });
  };

  const deleteRow = (index: number) => {
    // eslint-disable-next-line no-debugger
    debugger;
    const test = tableRows.filter((value, i) => i !== index);
    setTableRows(test);
    const filteredEntries = smpMixData.smpMixEntries.filter((value, i) => i !== index);
    setSMPMixData({
      ...smpMixData,
      smpMixEntries: filteredEntries
    });
  };

  useEffect(() => {
    if (!isMount) {
      fillTableAndResults(smpMixData);
    }
  }, [smpMixData, currentPageSize, tableRows]);

  return (
    <FlexGrid className="parent-tree-tabs">
      <Row className="title-row">
        <Column sm={4} md={5} lg={9}>
          <h2>{pageTexts.tabTitles.mixTab}</h2>
          <Subtitle text={pageTexts.smpMix.subtitle} />
        </Column>
      </Row>
      <Row className="notification-row">
        <InlineNotification
          lowContrast
          kind="info"
          aria-label={pageTexts.sharedTabTexts.notification.actionButtonLabel}
          subtitle={pageTexts.smpMix.notification.subtitle}
          title={pageTexts.sharedTabTexts.notification.title}
        />
      </Row>
      <Row className="parent-tree-table-row">
        <TableContainer
          title={pageTexts.tabTitles.mixTab}
          description={pageTexts.smpMix.tableSubtitle}
        >
          <TableToolbar>
            <TableToolbarContent>
              <Button
                renderIcon={Add}
                kind="ghost"
                iconDescription={pageTexts.smpMix.addButtonDesc}
                hasIconOnly
                onClick={() => addNewRow()}
              />
              <OverflowMenu
                aria-label={pageTexts.sharedTabTexts.overflowMenus.columnsOverflow}
                renderIcon={View}
                menuOptionsClass="parent-tree-view-options"
                iconDescription={pageTexts.sharedTabTexts.overflowMenus.columnsOverflow}
                flipped
              >
                <p className="view-options-separator">
                  {pageTexts.sharedTabTexts.overflowMenus.clonalValue}
                </p>
                {geneticTraits.map((trait) => (
                  <Checkbox
                    key={`checkbox-trait-${trait.code}-clonal`}
                    id={`checkbox-trait-${trait.code}-clonal`}
                    name={`checkbox-trait-${trait.code}-clonal`}
                    className="breeding-value-checkbox"
                    labelText={trait.filterLabel}
                    defaultChecked={filterControl[`${trait.code}-clonal`]}
                    value={filterControl[`${trait.code}-clonal`]}
                    onChange={
                      (e: React.ChangeEvent<HTMLInputElement>) => handleFilters(e, `${trait.code}-clonal`)
                    }
                  />
                ))}
                <p className="view-options-separator">
                  {pageTexts.sharedTabTexts.overflowMenus.weightedValue}
                </p>
                {geneticTraits.map((trait) => (
                  <Checkbox
                    key={`checkbox-trait-${trait.code}-weighted`}
                    id={`checkbox-trait-${trait.code}-weighted`}
                    name={`checkbox-trait-${trait.code}-weighted`}
                    className="breeding-value-checkbox"
                    labelText={trait.filterLabel}
                    defaultChecked={filterControl[`${trait.code}-weighted`]}
                    value={filterControl[`${trait.code}-weighted`]}
                    onChange={
                      (e: React.ChangeEvent<HTMLInputElement>) => handleFilters(e, `${trait.code}-weighted`)
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
                {smpMixFixedHeaders.map((header) => (
                  <TableHeader
                    key={header.key}
                  >
                    {header.header}
                  </TableHeader>
                ))}
                {geneticTraits.map((trait) => (
                  filterControl[`${trait.code}-clonal`]
                  && (
                    <TableHeader
                      key={`header-trait-${trait.code}-clonal`}
                    >
                      {`${trait.filterLabel} ${pageTexts.smpMix.clonalHeader}`}
                    </TableHeader>
                  )
                ))}
                {geneticTraits.map((trait) => (
                  filterControl[`${trait.code}-weighted`]
                  && (
                    <TableHeader
                      key={`header-trait-${trait.code}-weighted`}
                    >
                      {`${trait.filterLabel} ${pageTexts.smpMix.weightedHeader}`}
                    </TableHeader>
                  )
                ))}
                <TableHeader>
                  {pageTexts.smpMix.tableActions}
                </TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                tableRows.slice(firstRowIndex, firstRowIndex + currentPageSize).map((row, i) => (
                  <TableRow key={(row.id)}>
                    <TableCell>
                      <input
                        ref={(el: HTMLInputElement) => addRefs(el, `inputClone-${(row.id)}`)}
                        type="number"
                        className="table-input"
                        placeholder={pageTexts.sharedTabTexts.tableInputPlaceholder}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleTableChange('inputClone', e.target.value, i);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        ref={(el: HTMLInputElement) => addRefs(el, `inputVolume-${(row.id)}`)}
                        type="number"
                        className="table-input"
                        placeholder={pageTexts.sharedTabTexts.tableInputPlaceholder}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleTableChange('inputVolume', e.target.value, i);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        ref={(el: HTMLInputElement) => addRefs(el, `inputProportion-${(row.id)}`)}
                        type="number"
                        className="table-input"
                        placeholder={pageTexts.sharedTabTexts.tableInputPlaceholder}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          handleTableChange('inputProportion', e.target.value, i);
                        }}
                      />
                    </TableCell>
                    {
                      geneticTraits.map((trait) => (
                        (
                          // We can't make this render dinamically, because we need the reference
                          // of the inputs to set the values correctly when importing a file
                          <TableCell
                            key={`cell-trait-${trait.code}-${(row.id + i).toString()}-clonal`}
                            className={filterControl[`${trait.code}-clonal`] ? '' : 'parent-tree-hide'}
                          >
                            <input
                              ref={(el: HTMLInputElement) => addRefs(el, `inputTraitClonal-${trait.code}-${(row.id)}`)}
                              type="number"
                              className="table-input"
                              placeholder={pageTexts.sharedTabTexts.tableInputPlaceholder}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleTableChange('inputTraitClonal', e.target.value, i);
                              }}
                            />
                          </TableCell>
                        )
                      ))
                    }
                    {
                      geneticTraits.map((trait) => (
                        (
                          <TableCell
                            key={`cell-trait-${trait.code}-${(row.id + i).toString()}-weighted`}
                            className={filterControl[`${trait.code}-weighted`] ? '' : 'parent-tree-hide'}
                          >
                            <input
                              ref={(el: HTMLInputElement) => addRefs(el, `inputTraitWeighted-${trait.code}-${(row.id)}`)}
                              type="number"
                              className="table-input"
                              placeholder={pageTexts.sharedTabTexts.tableInputPlaceholder}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleTableChange('inputTraitWeighted', e.target.value, i);
                              }}
                            />
                          </TableCell>
                        )
                      ))
                    }
                    <TableCell>
                      <Button
                        renderIcon={TrashCan}
                        kind="ghost"
                        iconDescription={pageTexts.smpMix.deleteRow}
                        hasIconOnly
                        onClick={() => deleteRow(i)}
                      />
                    </TableCell>
                  </TableRow>
                ))
                }
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
          totalItems={tableRows.length}
          onChange={async ({ page, pageSize }: { page: number, pageSize: number }) => {
            await paginationOnChange(
              pageSize,
              page
            );
            fillTableAndResults(smpMixData, true);
          }}
        />
      </Row>
      <Row className="title-row">
        <Column sm={4} md={5} lg={9}>
          <h2>{pageTexts.smpMix.summary.title}</h2>
          <Subtitle text={pageTexts.smpMix.summary.subtitle} />
        </Column>
      </Row>
      <Row className="summary-row">
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="smpParentTrees"
            ref={(el: HTMLInputElement) => addRefs(el, 'smpParentTrees')}
            labelText={pageTexts.smpMix.summary.fieldLabels.smpParentTrees}
            readOnly
          />
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            id="totalVolume"
            ref={(el: HTMLInputElement) => addRefs(el, 'totalVolume')}
            labelText={pageTexts.smpMix.summary.fieldLabels.totalVolume}
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

export default CalculationSMPTab;
