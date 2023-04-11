/* eslint-disable max-len */
import React, { useState } from 'react';

import {
  Button,
  Checkbox,
  Column,
  ComboBox,
  DatePicker,
  DatePickerInput,
  FlexGrid,
  InlineNotification,
  Modal,
  Row,
  TextInput
} from '@carbon/react';

import ReactDOM from 'react-dom';
import Subtitle from '../../Subtitle';

import {
  inputText,
  DATE_FORMAT
} from './constants';

import './styles.scss';

interface ExtractionAndStorageProps {
  setStep: Function
}

interface ComboBoxEvent {
  selectedItem: string;
}

interface test {
  renderLauncher: any;
  children: any;
}

const ModalStateManager = ({ renderLauncher: LauncherContent, children: ModalContent }: test) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {!ModalContent || typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
          <ModalContent open={open} setOpen={setOpen} />,
          document.body
        )}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};

const ExtractionAndStorage = ({ setStep }: ExtractionAndStorageProps) => {
  console.log(setStep);

  const mockAgencyOptions: Array<string> = [
    '0032 - Strong Seeds Orchard - SSO',
    '0035 - Weak Seeds Orchard - WSO',
    '0038 - Okay Seeds Orchard - OSO'
  ];

  type ExtractionAndStorageForm = {
    extractoryAgency: string,
    extractorylocationCode: string,
    extractionStartDate: string,
    extractionEndDate: string,
    seedStorageAgency: string,
    seedStorageLocationCode: string,
    seedStorageStartDate: string,
    seedStorageEndDate: string
  }

  const intialExtractionAndStorageForm: ExtractionAndStorageForm = {
    extractoryAgency: '',
    extractorylocationCode: '',
    extractionStartDate: '',
    extractionEndDate: '',
    seedStorageAgency: '',
    seedStorageLocationCode: '',
    seedStorageStartDate: '',
    seedStorageEndDate: ''
  };

  // const [open, setOpen] = useState(false);
  // eslint-disable-next-line max-len
  const [extractionAndStorageForm, setExtractionAndStorageForm] = useState<ExtractionAndStorageForm>(intialExtractionAndStorageForm);

  const extractoryAgencyIsTSCisChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    // const { checked } = event.target;
    // setIsChecked(checked);
    // if (checked) {
    //   handleFormInput('agencyName', mockAgencyOptions[0]);
    // }
  };

  const handleFormInput = (name: keyof ExtractionAndStorageForm, value: string) => {
    const newForm = { ...extractionAndStorageForm };
    newForm[name] = value;
    setExtractionAndStorageForm(newForm);
    // validateInput(name, value);
  };

  return (
    <div className="extractory-and-storage-form">
      <FlexGrid fullWidth>
        <Row className="extraction-information-title">
          <Column lg={16}>
            <h2>{inputText.extractionTitle.titleText}</h2>
            <Subtitle text={inputText.extractionTitle.subtitleText} />
          </Column>
        </Row>
        <Row className="extractory-agency-tsc-checkbox-row">
          <Column sm={4} md={8} lg={16}>
            <Checkbox
              id="extractory-agency-tsc-checkbox"
              name="extractory-agency-tsc"
              labelText={inputText.extractorCheckbox.labelText}
              defaultChecked
              // eslint-disable-next-line max-len
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => extractoryAgencyIsTSCisChecked(e)}
            />
          </Column>
        </Row>
        <Row className="extractor-agency-row">
          <Column className="extractor-agency-col" sm={4} md={2} lg={8}>
            <ComboBox
              id="extractory-agency-combobox"
              // ref={nameInputRef}
              name="extractory-agency"
              helperText={inputText.extractor.helperText}
              onChange={(e: ComboBoxEvent) => { handleFormInput('extractoryAgency', e.selectedItem); }}
              selectedItem={extractionAndStorageForm.extractoryAgency}
              // shouldFilterItem={
              //   ({ item, inputValue }: FilterObj) => filterInput({ item, inputValue })
              // }
              titleText={inputText.extractor.titleText}
              // placeholder="Select Interim agency name"
              // readOnly={isChecked}
              items={mockAgencyOptions}

              // invalid={validationObj.isNameInvalid}
            />
          </Column>
          <Column className="extractor-agency-col" sm={4} md={2} lg={8}>
            <TextInput
              id="extractory-agency-location-code-input"
              name="extractory-agency-location-code"
              // ref={numberInputRef}
              // value={interimForm.locationCode}
              type="number"
              labelText={inputText.extractorCode.labelText}
              helperText={inputText.extractorCode.helperText}
              // invalid={validationObj.isCodeInvalid}
              // invalidText="Please enter a valid value"
              // readOnly={isChecked}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //   handleFormInput('locationCode', e.target.value);
              // }}
            />
          </Column>
        </Row>
        <Row className="extraction-date-row">
          <Column className="extraction-start-date-col" sm={4} md={2} lg={8}>
            <DatePicker
              datePickerType="single"
              name="extractionStartDate"
              dateFormat={DATE_FORMAT}
              // maxDate={getMaxDate()}
              // minDate=""
              // value={initialForm.startDate === '' ? '' : moment(initialForm.startDate)}
              // onChange={(_e: Array<Date>, selectedDate: string) => {
              //   handleFormInput('startDate', selectedDate);
              // }}
            >
              <DatePickerInput
                id="extraction-start-date-input"
                labelText={inputText.date.extraction.labelText.start}
                helperText={inputText.date.helperText}
                placeholder={inputText.date.placeholder}
                // invalid={validationObj.isStartDateInvalid}
                // invalidText="Please, enter a valid date"
              />
            </DatePicker>
          </Column>
          <Column className="extraction-end-date-col" sm={4} md={2} lg={8}>
            <DatePicker
              datePickerType="single"
              name="extractionEndDate"
              dateFormat={DATE_FORMAT}
              // maxDate={getTodayDate()}
              // minDate={getMinDate()}
              // value={initialForm.endDate === '' ? '' : moment(initialForm.endDate)}
              // onChange={(_e: Array<Date>, selectedDate: string) => {
              //   handleFormInput('endDate', selectedDate);
              // }}
            >
              <DatePickerInput
                id="extraction-end-date-input"
                labelText={inputText.date.extraction.labelText.end}
                helperText={inputText.date.helperText}
                placeholder={inputText.date.placeholder}
                // invalid={validationObj.isEndDateInvalid}
                // invalidText="Please, enter a valid date"
              />
            </DatePicker>
          </Column>
        </Row>
        <InlineNotification
          lowContrast
          kind="info"
          title={inputText.date.extraction.notification.title}
          subtitle={inputText.date.extraction.notification.subtitle}
        />
        <Row className="temporary-seed-storage-title">
          <Column lg={16}>
            <h2>{inputText.storageTitle.titleText}</h2>
            <Subtitle text={inputText.storageTitle.subtitleText} />
          </Column>
        </Row>
        <Row className="seed-storage-agency-tsc-checkbox-row">
          <Column sm={4} md={8} lg={16}>
            <Checkbox
              id="seed-storage-agency-tsc-checkbox"
              name="seed-storage-agency-tsc"
              labelText={inputText.storageCheckbox.labelText}
              defaultChecked
              // eslint-disable-next-line max-len
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => extractoryAgencyIsTSCisChecked(e)}
            />
          </Column>
        </Row>
        <Row className="seed-storage-agency-row">
          <Column className="seed-storage-agency-col" sm={4} md={2} lg={8}>
            <ComboBox
              id="seed-storage-agency-combobox"
              // ref={nameInputRef}
              name="seed-storage-agency"
              helperText={inputText.storage.helperText}
              onChange={(e: ComboBoxEvent) => { handleFormInput('seedStorageAgency', e.selectedItem); }}
              selectedItem={extractionAndStorageForm.seedStorageAgency}
              // shouldFilterItem={
              //   ({ item, inputValue }: FilterObj) => filterInput({ item, inputValue })
              // }
              titleText={inputText.storage.titleText}
              // placeholder="Select Interim agency name"
              // readOnly={isChecked}
              items={mockAgencyOptions}
              // invalid={validationObj.isNameInvalid}
            />
          </Column>
          <Column className="seed-storage-location-code-col" sm={4} md={2} lg={8}>
            <TextInput
              id="seed-storage-location-code-input"
              name="seed-storage-location-code"
              // ref={numberInputRef}
              // value={interimForm.locationCode}
              type="number"
              labelText={inputText.storageCode.labelText}
              helperText={inputText.storageCode.helperText}
              // invalid={validationObj.isCodeInvalid}
              // invalidText="Please enter a valid value"
              // readOnly={isChecked}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //   handleFormInput('locationCode', e.target.value);
              // }}
            />
          </Column>
        </Row>
        <Row className="storage-date-row">
          <Column className="storage-start-date-col" sm={4} md={2} lg={8}>
            <DatePicker
              datePickerType="single"
              name="storageStartDate"
              dateFormat={DATE_FORMAT}
              // maxDate={getMaxDate()}
              // minDate=""
              // value={initialForm.startDate === '' ? '' : moment(initialForm.startDate)}
              // onChange={(_e: Array<Date>, selectedDate: string) => {
              //   handleFormInput('startDate', selectedDate);
              // }}
            >
              <DatePickerInput
                id="storage-start-date-input"
                labelText={inputText.date.storage.labelText.start}
                helperText={inputText.date.helperText}
                placeholder={inputText.date.placeholder}
                // invalid={validationObj.isStartDateInvalid}
                // invalidText="Please, enter a valid date"
              />
            </DatePicker>
          </Column>
          <Column className="storage-end-date-col" sm={4} md={2} lg={8}>
            <DatePicker
              datePickerType="single"
              name="storageEndDate"
              dateFormat={DATE_FORMAT}
              // maxDate={getTodayDate()}
              // minDate={getMinDate()}
              // value={initialForm.endDate === '' ? '' : moment(initialForm.endDate)}
              // onChange={(_e: Array<Date>, selectedDate: string) => {
              //   handleFormInput('endDate', selectedDate);
              // }}
            >
              <DatePickerInput
                id="storage-end-date-input"
                labelText={inputText.date.storage.labelText.end}
                helperText={inputText.date.helperText}
                placeholder={inputText.date.placeholder}
                // invalid={validationObj.isEndDateInvalid}
                // invalidText="Please, enter a valid date"
              />
            </DatePicker>
          </Column>
        </Row>
        <InlineNotification
          lowContrast
          kind="info"
          title={inputText.date.storage.notification.title}
          subtitle={inputText.date.storage.notification.subtitle}
        />
        <ModalStateManager
          renderLauncher={({ setOpen }: any) => (
            <Button onClick={() => setOpen(true)}>{inputText.modal.buttonText}</Button>
          )}
        >
          {({ open, setOpen }: any) => (
            <Modal
              size="sm"
              className="seedlot-registration-modal"
              modalLabel={inputText.modal.modalLabel}
              modalHeading={inputText.modal.modalHeading}
              primaryButtonText={inputText.modal.primaryButtonText}
              secondaryButtonText={inputText.modal.secondaryButtonText}
              open={open}
              onRequestClose={() => setOpen(false)}
            >
              <p>{inputText.modal.helperText}</p>
              <Checkbox
                id="declaration-modal-checkbox"
                name="declaration-modal"
                labelText={inputText.modal.checkboxLabelText}
                // eslint-disable-next-line max-len
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => extractoryAgencyIsTSCisChecked(e)}
              />
              <InlineNotification
                lowContrast
                kind="info"
                title={inputText.modal.notification.title}
                // Fix here! Error: 'Failed prop type: Invalid prop `subtitle` of type `object` supplied to `InlineNotification`, expected `string`'
                subtitle={(
                  <span>
                    {inputText.modal.notification.subtitle}
                    <br />
                    <br />
                    {inputText.modal.notification.link}
                  </span>
                )}
              />
            </Modal>
          )}
        </ModalStateManager>
      </FlexGrid>
    </div>
  );
};

export default ExtractionAndStorage;
