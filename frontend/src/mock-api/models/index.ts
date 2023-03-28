/* eslint-disable import/no-unresolved */
import { Model } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';

import CardType from '../../types/Card';
import GeneticClassesType from '../../types/GeneticClasses';
import ApplicantInfo from '../../types/ApplicantInfo';
import SeedlotRegistration from '../../types/SeedlotRegistration';
import Seedlot from '../../types/Seedlot';
import CollectionInformation from '../../types/CollectionInformation';
import CollectorAgency from '../../types/CollectorAgency';

const FavouriteModel: ModelDefinition<CardType> = Model.extend({});
const GeneticClassesModel: ModelDefinition<GeneticClassesType> = Model.extend({});
const ApplicantInfoModel: ModelDefinition<ApplicantInfo> = Model.extend({});
const SeedlotRegistrationModel: ModelDefinition<SeedlotRegistration> = Model.extend({});
const SeedlotInfoModel: ModelDefinition<SeedlotRegistration> = Model.extend({});
const SeedlotModel: ModelDefinition<Seedlot> = Model.extend({});
const CollectionInformationModel: ModelDefinition<CollectionInformation> = Model.extend({});
const CollectorAgencyModel: ModelDefinition<CollectorAgency> = Model.extend({});

const models = {
  favourites: FavouriteModel,
  geneticClasses: GeneticClassesModel,
  applicantInfo: ApplicantInfoModel,
  seedlotRegistration: SeedlotRegistrationModel,
  seedlotInfos: SeedlotInfoModel,
  seedlotData: SeedlotModel,
  collectionInformation: CollectionInformationModel,
  collectorAgency: CollectorAgencyModel,
};

export default models;
