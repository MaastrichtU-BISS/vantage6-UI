// Route paths (is an array when a parameter is needed)
export const routePaths = {
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
  //Roles
  roles: `/roles`,
  rolesForOrganization: [`/roles`],
  roleCreate: `/role/create`,
  roleCreateForOrganization: [`/role/create`],
  roleEdit: [`/role`, 'edit'],
  collaborations: `/collaborations`,
  collaborationsForOrganization: [`/collaborations`],
  collaboration: [`/collaboration`],
  collaborationCreate: `/collaboration/create`,
  collaborationEdit: [`/collaboration`, 'edit'],
  //Task
  tasks: `/tasks`,
  tasksPerOrganization: [`/tasks/org`],
  tasksPerCollaboration: [`/tasks/collab`]
}

// Routes for routerLink configuration
export const routeConfig = {
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
