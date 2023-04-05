import CollectionMethods from './CollectionMethods';
import CollectorAgency from './CollectorAgency';

type CollectionInformation = {
    seedlotNumber: number;
    applicant?: CollectorAgency;
    locationCode?: string;
    startDate?: string;
    endDate?: string;
    numberOfContainers?: number;
    volumePerContainer?: number;
    volumeOfCones?: number;
    collectionMethods?: CollectionMethods;
    comments?: string;
}

export default CollectionInformation;