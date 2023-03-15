export interface SingleOwnerForm {
  id: number,
  ownerAgency: string,
  ownerCode: string,
  ownerPortion: string,
  reservedPerc: string,
  surplusPerc: string,
  fundingSource: string,
  methodOfPayment: string
}

export interface ValidationProp {
  id: number,
  isAgencyInvalid: boolean,
  isPortionInvalid: boolean,
  isOwnerCodeInvalid: boolean,
  isReservedInvalid: boolean,
  isSurplusInvalid: boolean,
  isSourceInvalid: boolean,
  isPaymentInvalid: boolean
}

export interface StateReturnObj {
  newOwnerArr: Array<SingleOwnerForm>,
  newValidArr: Array<ValidationProp>
}

export interface ComboBoxEvent {
  selectedItem: string
}

export interface CheckBoxValue {
  checked: boolean,
  id: string
}

export interface NumStepperVal {
  value: number,
  direction: string
}

const ownerTemplate = {
  id: -1,
  ownerAgency: '',
  ownerPortion: '0.00',
  ownerCode: '',
  reservedPerc: '100.00',
  surplusPerc: '0.00',
  fundingSource: '',
  methodOfPayment: ''
};

const validTemplate = {
  id: -1,
  isAgencyInvalid: false,
  isPortionInvalid: false,
  isOwnerCodeInvalid: false,
  isReservedInvalid: false,
  isSurplusInvalid: false,
  isSourceInvalid: false,
  isPaymentInvalid: false
};

const getNextId = (currentArray: Array<SingleOwnerForm>) => {
  let max = -1;
  currentArray.forEach((obj) => {
    if (obj.id > max) {
      max = obj.id;
    }
  });
  return max + 1;
};

export const insertOwnerForm = (
  ownershiptArray: Array<SingleOwnerForm>,
  validationArray: Array<ValidationProp>
) => {
  const newOwnerForm = { ...ownerTemplate };
  const newValidForm = { ...validTemplate };
  const newId = getNextId(ownershiptArray);
  newOwnerForm.id = newId;
  newValidForm.id = newId;
  return {
    newOwnerArr: [...ownershiptArray, newOwnerForm],
    newValidArr: [...validationArray, newValidForm]
  };
};

export const deleteOwnerForm = (
  id: number,
  ownershiptArray: Array<SingleOwnerForm>,
  validationArray: Array<ValidationProp>
) => {
  if (id === 0) {
    return {
      newOwnerArr: ownershiptArray,
      newValidArr: validationArray
    };
  }
  const newOwnerArray = ownershiptArray.filter((obj) => obj.id !== id);
  const newValidArray = validationArray.filter((obj) => obj.id !== id);
  return {
    newOwnerArr: newOwnerArray,
    newValidArr: newValidArray
  };
};

// Assume the fullString is in the form of '0032 - Strong Seeds Orchard - SSO'
// Returns the middle string, e.g. 'Strong Seeds Orchard'
export const getAgencyName = (fullString: string | null) => {
  if (fullString === null || !fullString.includes('-')) {
    return 'Owner agency name';
  }

  const splitArr = fullString.split(' - ');
  if (splitArr.length === 3) {
    return splitArr[1];
  }
  return '';
};

export const formatPortionPerc = (value: string) => {
  if (value === null || value === '' || Number(value) === 0) {
    return '--';
  }
  // If the value is an integer return the whole number
  if (Number(value) % 1 === 0) {
    return Number(value).toFixed(0);
  }
  return value;
};

// The sum of reserved and surplus should be 100, if one is changed, auto calc the other one
export const calcResvOrSurp = (
  index: number,
  field: string,
  value: string,
  currentArray: Array<SingleOwnerForm>
) => {
  const theOther = field === 'reservedPerc' ? 'surplusPerc' : 'reservedPerc';
  let theOtherValue = String((100 - Number(value)).toFixed(2));
  // If the other value is an int then show a whole number
  if (Number(theOtherValue) % 1 === 0) {
    theOtherValue = Number(theOtherValue).toFixed(0);
  }
  const newArr = [...currentArray];
  newArr[index] = {
    ...newArr[index],
    [theOther]: theOtherValue
  };
  return newArr;
};

// export const validateInput = (inputName: string, inputValue: string) => {

// };
