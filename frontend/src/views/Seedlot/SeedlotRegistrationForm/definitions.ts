import InterimForm from '../../../components/SeedlotRegistrationProgress/InterimStorage/definitions';
import { SingleOwnerForm } from '../../../components/SeedlotRegistrationSteps/OwnershipStep/definitions';

export type AllStepData = {
  interimStep: InterimForm,
  ownershipStep: Array<SingleOwnerForm>
}
