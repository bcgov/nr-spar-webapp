export const MAX_ROWS = 500;

export const pageTexts = {
  tabTitles: {
    coneTab: 'Cone and pollen count',
    smpTab: 'SMP success on parent',
    mixTab: 'Calculation of SMP mix'
  },
  coneAndPollen: {
    subtitle: 'Enter the cone and pollen count manually or upload a spreadsheet file with the template for the cone and pollen count table. Remember to keep your orchard updated, you can go to orchard\'s management page to edit the listed parent trees in your orchard.',
    tableSubtitle: 'Enter the estimative of cone and pollen count for the orchard\'s seedlot (*required)',
    notification: {
      title: 'Upload spreadsheet to table',
      subtitle: 'You can import one spreadsheet file for the cone and pollen count table with the data you want to use. For further guidance on how to organize the data, do use the SPAR\'s spreadsheet template.',
      templateLink: 'Download cone and pollen count template',
      actionButtonLabel: 'Close notification'
    },
    summary: {
      title: 'Summary',
      subtitle: 'Check the parent tree contribution summary',
      fieldLabels: {
        totalParentTrees: 'Total number of parent trees',
        totalConeCount: 'Total number of cone count',
        totalPollenCount: 'Total number of pollen count',
        averageSMP: 'Average number of SMP success %'
      }
    },
    geneticWorth: {
      title: 'Genetic worth and diversity',
      subtitle: 'Check the genetic worth and diversity of your seedlot',
      defaultFieldsLabels: {
        populationSize: 'Effective population size (Ne)',
        testedParentTree: 'Tested parent tree contribution (%)',
        coancestry: 'Coancestry (Sum PiPj * Cij)',
        smpParents: 'Number of SMP parents from outside'
      }
    }
  }
};

export const geneticTraits = {
  ad: {
    description: 'Genetic worth AD',
    code: 'ad'
  },
  dfs: {
    description: 'Genetic worth DFS',
    code: 'dfs'
  },
  dfu: {
    description: 'Genetic worth DFU',
    code: 'dfu'
  },
  dfw: {
    description: 'Genetic worth DFW',
    code: 'dfw'
  },
  dsb: {
    description: 'Genetic worth DSB',
    code: 'dsb'
  },
  dsc: {
    description: 'Genetic worth DSC',
    code: 'dsc'
  },
  dsg: {
    description: 'Genetic worth DSG',
    code: 'dsg'
  },
  gvo: {
    description: 'Genetic worth GVO',
    code: 'gvo'
  },
  iws: {
    description: 'Genetic worth IWS',
    code: 'iws'
  },
  wdu: {
    description: 'Genetic worth WDU',
    code: 'wdu'
  },
  wwd: {
    description: 'Genetic worth WWD',
    code: 'wwd'
  },
  wve: {
    description: 'Genetic worth WVE',
    code: 'wve'
  }
};
