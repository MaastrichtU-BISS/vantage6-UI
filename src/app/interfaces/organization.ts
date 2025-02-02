import { Node } from 'src/app/interfaces/node';
import { ResType } from 'src/app/shared/enum';
import { deepcopy } from '../shared/utils';

export interface Organization {
  id: number;
  type: string;
  name: string;
  address1: string;
  address2: string;
  zipcode: string;
  country: string;
  domain: string;
  public_key: string | null;
  is_being_created?: boolean;
  collaboration_ids: number[];
}

export interface OrganizationInCollaboration extends Organization {
  node?: Node;
}

export const EMPTY_ORGANIZATION = {
  id: -1,
  type: ResType.ORGANIZATION,
  name: '',
  address1: '',
  address2: '',
  zipcode: '',
  country: '',
  domain: '',
  public_key: '',
  collaboration_ids: [],
};

export function getEmptyOrganization() {
  return deepcopy(EMPTY_ORGANIZATION);
}
