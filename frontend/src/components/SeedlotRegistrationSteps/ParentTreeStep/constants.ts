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
      },
      specificFieldsLabels: {
        ad: 'Genetic worth AD',
        dfs: 'Genetic worth DFS',
        dfu: 'Genetic worth DFU',
        dfw: 'Genetic worth DFW',
        dsb: 'Genetic worth DSB',
        dsc: 'Genetic worth DSC',
        gvo: 'Genetic worth GVO',
        wdu: 'Genetic worth WDU',
        wwd: 'Genetic worth WWD',
        dsg: 'Genetic worth DSG',
        iws: 'Genetic worth IWS',
        wve: 'Genetic worth WVE'
      }
    }
  }
};

export const geneticTraits = [
  'ad',
  'dfs',
  'dfu',
  'dfw',
  'dsb',
  'dsc',
  'gvo',
  'wdu',
  'wwd',
  'dsg',
  'iws',
  'wve'
];