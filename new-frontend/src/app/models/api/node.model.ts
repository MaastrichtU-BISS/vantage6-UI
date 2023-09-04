import { BaseOrganization } from './organization.model';

export enum DatabaseType {
  CSV = 'csv',
  Excel = 'excel',
  Sparql = 'sparql',
  Parquet = 'parquet',
  SQL = 'sql',
  OMOP = 'omop',
  Other = 'other'
}

export interface BaseNode {
  id: number;
  organization: BaseOrganization;
  name: string;
  config: Config[];
  status?: string;
}

interface Config {
  key: string;
  value: string;
}

export interface Database {
  name: string;
  type: DatabaseType;
}
