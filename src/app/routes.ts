// Route paths (is an array when a parameter is needed)
export const routePaths = {
  //Account
  login: `/login`,
  profile: `/profile`,
  passwordLost: `/password_lost`,
  passwordRecover: `/password_recover`,
  setupMFA: `/setup_mfa`,
  codeMFA: `/mfa_code`,
  lostMFA: `/mfa_lost`,
  recoverMFA: `/mfa_recover`,
  //Home
  start: '/start',
  homeSettings: `/home`,
  homeCollaboration: `/home`,
  //Organization
  organization: [`/organization`],
  organizationCreate: `/organization/create`,
  organizationEdit: [`/organization`, 'edit'],
  //User
  users: `/users`,
  usersForOrganization: [`/users`],
  userCreate: `/user/create`,
  userCreateForOrganization: [`/user/create`],
  userEdit: [`/user`, 'edit'],
  user: [`/user`],
  //Roles
  roles: `/roles`,
  rolesForOrganization: [`/roles`],
  roleCreate: `/role/create`,
  roleCreateForOrganization: [`/role/create`],
  role: [`/role`],
  roleEdit: [`/role`, 'edit'],
  collaborations: `/collaborations`,
  collaborationsForOrganization: [`/collaborations`],
  collaboration: [`/collaboration`],
  collaborationCreate: `/collaboration/create`,
  collaborationEdit: [`/collaboration`, 'edit'],
  //Node
  nodes: `/nodes`,
  nodesPerOrganization: [`/nodes/org`],
  nodesPerCollaboration: [`/nodes/collab`],
  node: ['/node'],
  //Task
  tasks: `/tasks`,
  tasksPerOrganization: [`/tasks/org`],
  tasksPerCollaboration: [`/tasks/collab`],
  task: ['/task'],
  taskCreate: [`/task/create`],
  taskRepeat: [`/task/create`, 'repeat'],
  //Other
  statusMessages: `/status-messages`,
}

// Routes for routerLink configuration
export const routeConfig = {
  //Account
  login: 'login',
  profile: 'profile',
  passwordLost: 'password_lost',
  passwordRecover: 'password_recover',
  setupMFA: 'setup_mfa',
  codeMFA: 'mfa_code',
  lostMFA: 'mfa_lost',
  recoverMFA: 'mfa_recover',
  //Home
  start: 'start',
  homeSettings: `home`,
  homeCollaboration: `home`,
  //Organization
  organization: 'organization/:id',
  organizationCreate: 'organization/create',
  organizationEdit: 'organization/:id/edit',
  //User
  users: 'users',
  usersForOrganization: 'users/:org_id',
  userCreate: 'user/create',
  userCreateForOrganization: 'user/create/:org_id',
  user:  'user/:org_id/:id',
  userEdit: 'user/:id/edit',
  //Roles
  roles: 'roles',
  rolesForOrganization: 'roles/:org_id',
  roleCreate: 'role/create',
  roleCreateForOrganization: 'role/create/:org_id',
  role: 'role/:org_id/:id',
  roleEdit: 'role/:id/edit',
  //Collaborations
  collaborations: 'collaborations',
  collaborationsForOrganization: 'collaborations/:org_id',
  collaboration: 'collaboration/:org_id/:id',
  collaborationCreate: 'collaboration/create',
  collaborationEdit: 'collaboration/:id/edit',
  //Node
  nodes: 'nodes',
  nodesPerOrganization: 'nodes/org/:org_id',
  nodesPerCollaboration: 'nodes/collab/:collab_id',
  node: 'node/:org_id/:id',
  //Task
  tasks: 'tasks',
  taskPerOrganization: 'tasks/org/:org_id',
  tasksPerCollaboration: 'tasks/collab/:collab_id',
  task: 'task/:org_id/:id',
  taskCreate: 'task/create/:org_id',
  taskRepeat: 'task/create/:org_id/repeat/:id',
  //Other
  statusMessages: 'status-messages'
};
