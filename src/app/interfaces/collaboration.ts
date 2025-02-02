import { OrganizationInCollaboration } from 'src/app/interfaces/organization';
import { ResType } from 'src/app/shared/enum';
import { deepcopy } from '../shared/utils';

export interface Collaboration {
  id: number;
  type: ResType;
  name: string;
  encrypted: boolean;
  organization_ids: number[];
  organizations: OrganizationInCollaboration[];
}

export const EMPTY_COLLABORATION = {
  id: -1,
  name: '',
  type: ResType.COLLABORATION,
  encrypted: true,
  organizations: [],
  organization_ids: [],
};

export function getEmptyCollaboration(): Collaboration {
  return deepcopy(EMPTY_COLLABORATION);
}
