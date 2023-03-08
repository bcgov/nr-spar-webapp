export interface filterObj {
    item: string,
    inputValue: string,
  }

export const filterInput = ({item, inputValue}: filterObj) => {
    if (inputValue === null) {
      return true;
    }
    return item.toLowerCase().includes(inputValue.toLowerCase());
}