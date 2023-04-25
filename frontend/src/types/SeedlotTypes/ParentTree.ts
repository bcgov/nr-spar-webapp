export type ConeAndPollenEntriesType = {
  cloneNumber: number;
  coneCount: number;
  pollenCount: number;
  smpSuccess: number;
  [genTrait: string]: number;
};

export type ConeAndPollenTraitsTotal = {
  [genTraitTotal: string]: number;
}

export type ConeAndPollenType = {
  coneAndPollenEntries: ConeAndPollenEntriesType[];
  totalParentTreesConeAndPollen: number;
  totalConeCount: number;
  totalPollenCount: number;
  averageSMP: number;
  populationSize: number;
  testedParentTree: number;
  coancestry: number;
  smpParents: number;
  genTraitTotal: ConeAndPollenTraitsTotal;
};

export type ParentTreeType = {
  coneAndPollen: ConeAndPollenType;
};
