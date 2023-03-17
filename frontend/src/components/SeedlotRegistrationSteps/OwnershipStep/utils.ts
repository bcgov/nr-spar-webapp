import { inputText, ownerTemplate, validTemplate } from './config';

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

interface SingleInvalidObj {
  isInvalid: boolean,
  invalidText: string
}

export interface ValidationProp {
  id: number,
  owner: SingleInvalidObj,
  code: SingleInvalidObj,
  portion: SingleInvalidObj,
  reserved: SingleInvalidObj,
  surplus: SingleInvalidObj,
  funding: SingleInvalidObj,
  payment: SingleInvalidObj
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

const twoDigitRegex = /^[0-9]{2}$/;

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

const isDecimalValid = (value: string) => {
  if (value.includes('.')) {
    if (value.split('.')[1].length > 2) {
      return false;
    }
  }
  return true;
};

const validatePerc = (value: string): SingleInvalidObj => {
  let invalidText = inputText.twoDecimal;
  let isInvalid = !isDecimalValid(value);
  if (!isInvalid) {
    if (Number(value) > 100) {
      isInvalid = true;
      invalidText = inputText.greaterThan;
    }
    if (Number(value) < 0) {
      isInvalid = true;
      invalidText = inputText.lowerThan;
    }
  }
  return { isInvalid, invalidText };
};

export const getValidKey = (name: string) => {
  const inputKeys = Object.keys(ownerTemplate);
  const validKeys = Object.keys(validTemplate);
  const inputKeyIndex = inputKeys.indexOf(name);
  if (inputKeyIndex === -1 || inputKeys.length !== validKeys.length) {
    throw new Error('Failed to retrieve valid key');
  }
  return validKeys[inputKeyIndex];
};

// The sum of reserved and surplus should be 100, if one is changed, auto calc the other one
export const calcResvOrSurp = (
  index: number,
  field: string,
  value: string,
  currentArray: Array<SingleOwnerForm>
) => {
  const theOtherName = field === 'reservedPerc' ? 'surplusPerc' : 'reservedPerc';
  let theOtherValue = String((100 - Number(value)).toFixed(2));
  // If the other value is an int then show a whole number
  if (Number(theOtherValue) % 1 === 0) {
    theOtherValue = Number(theOtherValue).toFixed(0);
  }
  const newArr = [...currentArray];
  newArr[index] = {
    ...newArr[index],
    [theOtherName]: theOtherValue
  };
  const { isInvalid, invalidText } = validatePerc(theOtherValue);
  const validKey = getValidKey(theOtherName);
  return {
    newArr,
    isInvalid,
    invalidText,
    validKey
  };
};

export const skipForInvalidLength = (name: string, value: string) => {
  if (name === 'ownerCode' && value.length > 2) {
    return true;
  }
  return false;
};

const isInputEmpty = (value: string) => {
  // null can be the value even with the type check
  if (value === '' || value === null) {
    return true;
  }
  return false;
};

export const isInputInvalid = (name: string, value: string): SingleInvalidObj => {
  let isInvalid = false;
  let invalidText = '';
  switch (name) {
    case 'ownerAgency':
      isInvalid = isInputEmpty(value);
      invalidText = inputText.owner.invalidText;
      return {
        isInvalid,
        invalidText
      };
    case 'ownerCode':
      isInvalid = !twoDigitRegex.test(value);
      invalidText = inputText.code.invalidText;
      return {
        isInvalid,
        invalidText
      };
    case 'ownerPortion':
      return validatePerc(value);
    case 'reservedPerc':
      return validatePerc(value);
    case 'surplusPerc':
      return validatePerc(value);
    case 'fundingSource':
      isInvalid = isInputEmpty(value);
      invalidText = inputText.funding.invalidText;
      return {
        isInvalid,
        invalidText
      };
    case 'methodOfPayment':
      isInvalid = isInputEmpty(value);
      invalidText = inputText.payment.invalidText;
      return {
        isInvalid,
        invalidText
      };
    default:
      return {
        isInvalid: false,
        invalidText: ''
      };
  }
};
