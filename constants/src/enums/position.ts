export enum Position {
  GOALKEEPER = 'GOALKEEPER',
  DEFENDER = 'DEFENDER',
  MIDFIELDER = 'MIDFIELDER',
  FORWARD = 'FORWARD',
}

export const positionMap = new Map<Position, string>([
  [Position.GOALKEEPER, 'Goleiro'],
  [Position.DEFENDER, 'Defensor'],
  [Position.MIDFIELDER, 'Meio-campista'],
  [Position.FORWARD, 'Atacante'],
]);

export const POSITION_OPTIONS = Array.from(positionMap).map(([value, label]) => ({
  value,
  label,
})); 