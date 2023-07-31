const SETTINGS_PATH = 'settings';

// Route paths (is an array when a parameter is needed)
export const routePaths = {
  //Home
  start: '/start',
  homeSettings: `/${SETTINGS_PATH}/home`,
  homeCollaboration: `/home`,
  //Organization
  organization: [`/${SETTINGS_PATH}/organization`],
  organizationCreate: `/${SETTINGS_PATH}/organization/create`,
  organizationEdit: [`/${SETTINGS_PATH}/organization`, 'edit'],
  //User
  users: `/${SETTINGS_PATH}/users`,
  usersForOrganization: [`/${SETTINGS_PATH}/users`],
  userCreate: `/${SETTINGS_PATH}/user/create`,
  userCreateForOrganization: [`/${SETTINGS_PATH}/user/create`],
  userEdit: [`/${SETTINGS_PATH}/user`, 'edit'],
  //Roles
  roles: `/${SETTINGS_PATH}/roles`,
  rolesForOrganization: [`/${SETTINGS_PATH}/roles`],
  roleCreate: `/${SETTINGS_PATH}/role/create`,
  roleCreateForOrganization: [`/${SETTINGS_PATH}/role/create`],
  roleEdit: [`/${SETTINGS_PATH}/role`, 'edit'],
  collaborations: `/${SETTINGS_PATH}/collaborations`,
  collaborationsForOrganization: [`/${SETTINGS_PATH}/collaborations`],
  collaboration: [`/${SETTINGS_PATH}/collaboration`],
  collaborationCreate: `/${SETTINGS_PATH}/collaboration/create`,
  collaborationEdit: [`/${SETTINGS_PATH}/collaboration`, 'edit'],
  //Task
  tasks: `/${SETTINGS_PATH}/tasks`,
  tasksPerOrganization: [`/${SETTINGS_PATH}/tasks/org`],
  tasksPerCollaboration: [`/${SETTINGS_PATH}/tasks/collab`]
}

// Routes for routerLink configuration
export const routeConfig = {
  //Parents
  settings: SETTINGS_PATH,
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
  userEdit: 'user/:id/edit',
  //Roles
  roles: 'roles',
  rolesForOrganization: 'roles/:org_id',
  roleCreate: 'role/create',
  roleCreateForOrganization: 'role/create/:org_id',
  roleEdit: 'role/:id/edit',
  //Collaborations
  collaborations: 'collaborations',
  collaborationsForOrganization: 'collaborations/:org_id',
  collaboration: 'collaboration/:org_id/:id',
  collaborationCreate: 'collaboration/create',
  collaborationEdit: 'collaboration/:id/edit',
  //Task
  tasks: 'tasks',
  taskPerOrganization: 'tasks/org/:org_id',
  tasksPerCollaboration: 'tasks/collab/:collab_id'
};
