export const hasRole = (role: string, userRoles: string[] = []) =>
    userRoles.includes(role);


export const hasPermission = (permission: string[], userPermissions: string) =>
    permission.includes(userPermissions);
