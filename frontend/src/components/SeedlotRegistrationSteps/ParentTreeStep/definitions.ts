export type TableHeaders = {
  key: string;
  header: string;
}

export type TableRows = {
  id: string;
};

export type GeneticTraitsType = {
  code: string;
  description: string;
  filterLabel: string;
};

export type ControlFiltersType = {
  [key: string]: boolean;
};

export type ParentTreesIdType = {
  id: string;
};
