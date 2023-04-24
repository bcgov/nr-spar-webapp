import DropDownObj from '../types/DropDownObject';

const dropDownItem: DropDownObj = {
  label: '',
  code: '',
  description: ''
};

const capFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const sortAlphabetically = (a: DropDownObj, b: DropDownObj) => (
  a.label.toLocaleLowerCase() < b.label.toLocaleLowerCase()
    ? -1
    : 1
);

export const getDropDownList = (dataList: any, toCapFirstChar: boolean = true) => {
  const resultList: Array<DropDownObj> = [];

  dataList.forEach((data: any) => {
    const newItem = { ...dropDownItem };
    newItem.code = data.code;
    newItem.description = data.description;
    if (toCapFirstChar) {
      newItem.description = capFirstChar(newItem.description);
    }
    newItem.label = `${newItem.code} - ${newItem.description}`;
    resultList.push(newItem);
  });

  resultList.sort((a, b) => sortAlphabetically(a, b));

  return resultList;
};
