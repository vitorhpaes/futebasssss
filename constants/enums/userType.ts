export enum UserType {
  PLAYER = 'PLAYER',
  ADMIN = 'ADMIN',
}

export const userTypeMap = new Map<UserType, string>([
  [UserType.PLAYER, 'Jogador'],
  [UserType.ADMIN, 'Administrador'],
]);

export const USER_TYPE_OPTIONS = Array.from(userTypeMap).map(([value, label]) => ({
  value,
  label,
})); 