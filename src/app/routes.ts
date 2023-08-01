const convertPathToRoute = (path: string | string[]): string => {
  let route = '';

  if (Array.isArray(path)) {
    route = path.join('/');
  } else {
    route = path;
  }

  return route.substring(1);
};

// Route paths
export const routePaths = {
  //Account
  login: '/login',
  profile: '/profile',
  passwordLost: '/password_lost',
  passwordRecover: '/password_recover',
  setupMFA: '/setup_mfa',
  codeMFA: '/mfa_code',
  lostMFA: '/mfa_lost',
  recoverMFA: '/mfa_recover',
  //Home
  start: '/start',
  home: '/home',
  //Organization
  organization: ['/organization', ':id'],
  organizationCreate: '/organization/create',
  organizationEdit: ['/organization', ':id', 'edit'],
  //User
  users: '/users',
  usersForOrganization: ['/users', ':org_id'],
  userCreate: '/user/create',
  userCreateForOrganization: ['/user/create', ':org_id'],
  user: ['/user', ':org_id', ':id'],
  userEdit: ['/user', ':id', 'edit'],
  //Roles
  roles: '/roles',
  rolesForOrganization: ['/roles', ':org_id'],
  roleCreate: '/role/create',
  roleCreateForOrganization: ['/role/create', ':org_id'],
  role: ['/role', ':org_id', ':id'],
  roleEdit: ['/role', ':id', 'edit'],
  collaborations: '/collaborations',
  collaborationsForOrganization: ['/collaborations', ':org_id'],
  collaboration: ['/collaboration', ':org_id', ':id'],
  collaborationCreate: '/collaboration/create',
  collaborationEdit: ['/collaboration', ':id', 'edit'],
  //Node
  nodes: '/nodes',
  nodesPerOrganization: ['/nodes/org', ':org_id'],
  nodesPerCollaboration: ['/nodes/collab', ':collab_id'],
  node: ['/node', ':org_id', ':id'],
  //Task
  tasks: '/tasks',
  tasksPerOrganization: ['/tasks/org', ':org_id'],
  tasksPerCollaboration: ['/tasks/collab', ':collab_id'],
  task: ['/task', ':org_id', ':id'],
  taskCreate: ['/task/create', ':org_id'],
  taskRepeat: ['/task/create', ':org_id', 'repeat', ':id'],
  //Other
  statusMessages: '/status-messages',
};

// Routes for routerLink configuration
export const routeConfig = {
  //Account
  login: convertPathToRoute(routePaths.login),
  profile: convertPathToRoute(routePaths.profile),
  passwordLost: convertPathToRoute(routePaths.passwordLost),
  passwordRecover: convertPathToRoute(routePaths.passwordRecover),
  setupMFA: convertPathToRoute(routePaths.setupMFA),
  codeMFA: convertPathToRoute(routePaths.codeMFA),
  lostMFA: convertPathToRoute(routePaths.lostMFA),
  recoverMFA: convertPathToRoute(routePaths.recoverMFA),
  //Home
  start: convertPathToRoute(routePaths.start),
  home: convertPathToRoute(routePaths.home),
  //Organization
  organization: convertPathToRoute(routePaths.organization),
  organizationCreate: convertPathToRoute(routePaths.organizationCreate),
  organizationEdit: convertPathToRoute(routePaths.organizationEdit),
  //User
  users: convertPathToRoute(routePaths.users),
  usersForOrganization: convertPathToRoute(routePaths.usersForOrganization),
  userCreate: convertPathToRoute(routePaths.userCreate),
  userCreateForOrganization: convertPathToRoute(routePaths.userCreateForOrganization),
  user: convertPathToRoute(routePaths.user),
  userEdit: convertPathToRoute(routePaths.userEdit),
  //Roles
  roles: convertPathToRoute(routePaths.roles),
  rolesForOrganization: convertPathToRoute(routePaths.rolesForOrganization),
  roleCreate: convertPathToRoute(routePaths.roleCreate),
  roleCreateForOrganization: convertPathToRoute(routePaths.roleCreateForOrganization),
  role: convertPathToRoute(routePaths.role),
  roleEdit: convertPathToRoute(routePaths.roleEdit),
  //Collaborations
  collaborations: convertPathToRoute(routePaths.collaborations),
  collaborationsForOrganization: convertPathToRoute(routePaths.collaborationsForOrganization),
  collaboration: convertPathToRoute(routePaths.collaboration),
  collaborationCreate: convertPathToRoute(routePaths.collaborationCreate),
  collaborationEdit: convertPathToRoute(routePaths.collaborationEdit),
  //Node
  nodes: convertPathToRoute(routePaths.nodes),
  nodesPerOrganization: convertPathToRoute(routePaths.nodesPerOrganization),
  nodesPerCollaboration: convertPathToRoute(routePaths.nodesPerCollaboration),
  node: convertPathToRoute(routePaths.node),
  //Task
  tasks: convertPathToRoute(routePaths.tasks),
  taskPerOrganization: convertPathToRoute(routePaths.tasksPerOrganization),
  tasksPerCollaboration: convertPathToRoute(routePaths.tasksPerCollaboration),
  task: convertPathToRoute(routePaths.task),
  taskCreate: convertPathToRoute(routePaths.taskCreate),
  taskRepeat: convertPathToRoute(routePaths.taskRepeat),
  //Other
  statusMessages: convertPathToRoute(routePaths.statusMessages),
};
