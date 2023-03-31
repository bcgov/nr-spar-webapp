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
            <h2>Extraction information</h2>
            <Subtitle text="Enter the extractory agency information and extraction’s star and end dates for this seedlot" />
          </Column>
        </Row>
        <Row className="extractory-agency-tsc-checkbox-row">
          <Column sm={4} md={8} lg={16}>
            <Checkbox
              id="extractory-agency-tsc-checkbox"
              name="extractory-agency-tsc"
              labelText="The extractory agency is the Tree Seed Center (TSC)"
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
              helperText="You can enter your agency number, name or acronym"
              onChange={(e: ComboBoxEvent) => { handleFormInput('extractoryAgency', e.selectedItem); }}
              selectedItem={extractionAndStorageForm.extractoryAgency}
              // shouldFilterItem={
              //   ({ item, inputValue }: FilterObj) => filterInput({ item, inputValue })
              // }
              titleText="Extractory agency"
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
              labelText="Extractory agency location code"
              helperText="2-digit code that identifies the address of operated office or division"
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
              // dateFormat={DATE_FORMAT}
              // maxDate={getMaxDate()}
              // minDate=""
              // value={initialForm.startDate === '' ? '' : moment(initialForm.startDate)}
              // onChange={(_e: Array<Date>, selectedDate: string) => {
              //   handleFormInput('startDate', selectedDate);
              // }}
            >
              <DatePickerInput
                id="extraction-start-date-input"
                labelText="Extraction start date"
                helperText="year/month/day"
                placeholder="yyyy/mm/dd"
                // invalid={validationObj.isStartDateInvalid}
                // invalidText="Please, enter a valid date"
              />
            </DatePicker>
          </Column>
          <Column className="extraction-end-date-col" sm={4} md={2} lg={8}>
            <DatePicker
              datePickerType="single"
              name="extractionEndDate"
              // dateFormat={DATE_FORMAT}
              // maxDate={getTodayDate()}
              // minDate={getMinDate()}
              // value={initialForm.endDate === '' ? '' : moment(initialForm.endDate)}
              // onChange={(_e: Array<Date>, selectedDate: string) => {
              //   handleFormInput('endDate', selectedDate);
              // }}
            >
              <DatePickerInput
                id="extraction-end-date-input"
                labelText="Extraction end date"
                helperText="year/month/day"
                placeholder="yyyy/mm/dd"
                // invalid={validationObj.isEndDateInvalid}
                // invalidText="Please, enter a valid date"
              />
            </DatePicker>
          </Column>
        </Row>
        <InlineNotification
          lowContrast
          kind="info"
          title="Extraction start and end dates"
          subtitle="The extraction start and end dates will be filled by the TSC. You will receive a notification once it’s completed."
        />
        <Row className="temporary-seed-storage-title">
          <Column lg={16}>
            <h2>Temporary seed storage</h2>
            <Subtitle text="Enter the seed storage agency information and storage’s star and end dates for this seedlot" />
          </Column>
        </Row>
        <Row className="seed-storage-agency-tsc-checkbox-row">
          <Column sm={4} md={8} lg={16}>
            <Checkbox
              id="seed-storage-agency-tsc-checkbox"
              name="seed-storage-agency-tsc"
              labelText="The seed storage agency is the Tree Seed Center (TSC)"
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
              helperText="You can enter your agency number, name or acronym"
              onChange={(e: ComboBoxEvent) => { handleFormInput('seedStorageAgency', e.selectedItem); }}
              selectedItem={extractionAndStorageForm.seedStorageAgency}
              // shouldFilterItem={
              //   ({ item, inputValue }: FilterObj) => filterInput({ item, inputValue })
              // }
              titleText="Seed storage agency"
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
              labelText="Seed storage location code"
              helperText="2-digit code that identifies the address of operated office or division"
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
              // dateFormat={DATE_FORMAT}
              // maxDate={getMaxDate()}
              // minDate=""
              // value={initialForm.startDate === '' ? '' : moment(initialForm.startDate)}
              // onChange={(_e: Array<Date>, selectedDate: string) => {
              //   handleFormInput('startDate', selectedDate);
              // }}
            >
              <DatePickerInput
                id="storage-start-date-input"
                labelText="Storage start date"
                helperText="year/month/day"
                placeholder="yyyy/mm/dd"
                // invalid={validationObj.isStartDateInvalid}
                // invalidText="Please, enter a valid date"
              />
            </DatePicker>
          </Column>
          <Column className="storage-end-date-col" sm={4} md={2} lg={8}>
            <DatePicker
              datePickerType="single"
              name="storageEndDate"
              // dateFormat={DATE_FORMAT}
              // maxDate={getTodayDate()}
              // minDate={getMinDate()}
              // value={initialForm.endDate === '' ? '' : moment(initialForm.endDate)}
              // onChange={(_e: Array<Date>, selectedDate: string) => {
              //   handleFormInput('endDate', selectedDate);
              // }}
            >
              <DatePickerInput
                id="storage-end-date-input"
                labelText="Storage end date"
                helperText="year/month/day"
                placeholder="yyyy/mm/dd"
                // invalid={validationObj.isEndDateInvalid}
                // invalidText="Please, enter a valid date"
              />
            </DatePicker>
          </Column>
        </Row>
        <InlineNotification
          lowContrast
          kind="info"
          title="Storage start and end dates"
          subtitle="The storage start and end dates will be filled by the TSC. You will receive a notification once it’s completed."
        />
        <ModalStateManager
          renderLauncher={({ setOpen }: any) => (
            <Button onClick={() => setOpen(true)}>Launch modal</Button>
          )}
        >
          {({ open, setOpen }: any) => (
            <Modal
              size="sm"
              className="seedlot-registration-modal"
              modalLabel="Seedlot registration"
              modalHeading="Declaration"
              primaryButtonText="Submit seedlot"
              secondaryButtonText="Cancel"
              open={open}
              onRequestClose={() => setOpen(false)}
            >
              <p>
                Read and accept the declaration to complete the seedlot registration
              </p>
              <Checkbox
                id="declaration-modal-checkbox"
                name="declaration-modal"
                labelText="I hereby declare that the information provided in this application is true and correct, and that I am the owner of the seedlot or have been authorized by the owner(s) of the seedlot to submit this application."
                // eslint-disable-next-line max-len
                // onChange={(e: React.ChangeEvent<HTMLInputElement>) => extractoryAgencyIsTSCisChecked(e)}
              />
              <InlineNotification
                lowContrast
                kind="info"
                title="Review the form:"
                // Fix here! Error: 'Failed prop type: Invalid prop `subtitle` of type `object` supplied to `InlineNotification`, expected `string`'
                subtitle={(
                  <span>
                    Please, be sure to review the content and check if everything is correct with your seedlot registration.
                    <br />
                    <br />
                    Go to first step and review the form
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
