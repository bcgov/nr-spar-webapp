export type GeneticTraitsType = {
  code: string;
  description: string;
  filterLabel: string;
};

export type ControlFiltersType = {
  [key: string]: boolean;
};

export type ModalRenderControllerType = {
  setOpen: Function;
};

export type ModalRenderType = {
  open: boolean;
  setOpen: Function;
};
