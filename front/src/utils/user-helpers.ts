import { Position, UserType, POSITION_OPTIONS, USER_TYPE_OPTIONS } from '@futebass-ia/constants';

/**
 * Obtém o label da posição a partir do valor.
 * @param position - Valor da posição ou null/undefined
 * @returns Label da posição ou placeholder
 */
export const getPositionLabel = (position: string | null | undefined): string => {
  if (!position) return 'Não definida';
  
  const option = POSITION_OPTIONS.find(opt => opt.value === position);
  return option ? option.label : position;
};

/**
 * Obtém o label do tipo de usuário a partir do valor.
 * @param type - Valor do tipo de usuário ou null/undefined
 * @returns Label do tipo de usuário ou placeholder
 */
export const getUserTypeLabel = (type: string | null | undefined): string => {
  if (!type) return 'Não definido';
  
  const option = USER_TYPE_OPTIONS.find(opt => opt.value === type);
  return option ? option.label : type;
};

/**
 * Verifica se um usuário é administrador.
 * @param type - Tipo do usuário
 * @returns Boolean indicando se é admin
 */
export const isAdmin = (type: string | null | undefined): boolean => {
  return type === UserType.ADMIN;
};

/**
 * Verifica se um usuário é jogador.
 * @param type - Tipo do usuário
 * @returns Boolean indicando se é jogador
 */
export const isPlayer = (type: string | null | undefined): boolean => {
  return type === UserType.PLAYER;
}; 