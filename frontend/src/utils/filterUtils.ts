export interface filterObj {
    item: string,
    inputValue: string,
  }

export const filterInput = ({item, inputValue}: filterObj) => {
    return item.toLowerCase().includes(inputValue.toLowerCase());
}