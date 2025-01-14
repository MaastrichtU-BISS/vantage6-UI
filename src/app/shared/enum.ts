export enum ExitMode {
  CANCEL = 'CANCEL',
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  CREATE = 'CREATE',
  KILL = 'KILL',
}

export enum ResType {
  USER = 'user',
  ORGANIZATION = 'organization',
  COLLABORATION = 'collaboration',
  ROLE = 'role',
  NODE = 'node',
  TASK = 'task',
  RUN = 'run',
  RESULT = 'result',
  EVENT = 'event',
  PORT = 'port',
  RULE = 'rule',
  ANY = '*',
}

export enum ScopeType {
  OWN = 'own',
  ORGANIZATION = 'organization',
  COLLABORATION = 'collaboration',
  GLOBAL = 'global',
  ANY = '*',
}

export enum OpsType {
  VIEW = 'view',
  CREATE = 'create',
  EDIT = 'edit',
  DELETE = 'delete',
  SEND = 'send',
  RECEIVE = 'receive',
  ANY = '*',
}

export enum Sentiment {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
}

export enum TaskStatus {
  PENDING = 'pending',
  INITIALIZING = 'initializing',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  FAILED = 'failed',
  START_FAILED = 'start failed',
  NO_DOCKER_IMAGE = 'non-existing Docker image',
  CRASHED = 'crashed',
  KILLED = 'killed by user',
}
