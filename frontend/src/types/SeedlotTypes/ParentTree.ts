export type ConeAndPollenEntriesType = {
  cloneNumber: number;
  coneCount: number;
  pollenCount: number;
  smpSuccess: number;
  [genTrait: string]: number;
};

export type SMPSuccessEntriesType = {
  cloneNumber: number;
  successOnParent: number;
  nonOrchardPollenContam: number;
  [genTrait: string]: number;
};

export type GeneticWorthType = {
  populationSize: number;
  testedParentTree: number;
  coancestry: number;
  smpParents: number;
  [genTraitTotal: string]: number;
}

export type ConeAndPollenType = {
  coneAndPollenEntries: ConeAndPollenEntriesType[];
  totalParentTreesConeAndPollen: number;
  totalConeCount: number;
  totalPollenCount: number;
  averageSMP: number;
  geneticWorth: GeneticWorthType;
};

export type SMPSuccessType = {
  smpSuccessEntries: SMPSuccessEntriesType[];
  totalParentTreesSMPSuccess: number;
  averageNumberSMPSuccess: number;
  averageNonOrchardPollenContam: number;
  geneticWorth: GeneticWorthType;
};

export type ParentTreeType = {
  coneAndPollen: ConeAndPollenType;
  smpSuccess?: SMPSuccessType;
};
