export enum SessionStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export const sessionStatusMap = new Map<SessionStatus, string>([
  [SessionStatus.SCHEDULED, 'Agendada'],
  [SessionStatus.COMPLETED, 'Finalizada'],
  [SessionStatus.CANCELED, 'Cancelada'],
]);

export const SESSION_STATUS_OPTIONS = Array.from(sessionStatusMap).map(([value, label]) => ({
  value,
  label,
})); 