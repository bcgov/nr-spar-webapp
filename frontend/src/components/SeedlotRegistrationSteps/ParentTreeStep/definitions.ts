export type TableHeaders = {
  key: string;
  header: string;
}

export type GeneticTraitsType = {
  code: string;
  description: string;
  filterLabel: string;
};

export type ControlFiltersType = {
  [key: string]: boolean;
};

export type ParentTreesType = {
  id: string;
  value: string;
};

export type SMPSuccessFixedFiltersType = {
  code: string;
  description: string;
};