import { UserType, userTypeMap } from './userType';
import { Position, positionMap } from './position';
import { SessionStatus, sessionStatusMap } from './sessionStatus';

export interface Option<T = string> {
  label: string
  value: T
  isDisabled?: boolean
}

/**
 * Gera opções a partir de um enumerador e um mapa de labels
 */
export function generateEnumOptions<T extends string>(
  enumObj: Record<string, T>,
  labelMap: Map<T, string>,
  disabledOptions?: T[],
): Option<T>[] {
  return Object.values(enumObj)
    .filter((value) => typeof value === 'string')
    .map((value) => ({
      value,
      label: labelMap.get(value) || value,
      isDisabled: !!disabledOptions?.find(
        (disabledOption) => disabledOption === value,
      ),
    }));
}

/**
 * Encontra uma opção específica em uma lista de opções
 */
export function findEnumOption<T extends string>(options: Option<T>[], value: T): Option<T> | undefined {
  return options.find(({ value: optionValue }) => optionValue === value);
}

/**
 * Gera opções para o enumerador UserType
 */
export function getUserTypeOptions(disabledOptions?: UserType[]): Option<UserType>[] {
  return generateEnumOptions(UserType, userTypeMap, disabledOptions);
}

/**
 * Gera opções para o enumerador Position
 */
export function getPositionOptions(disabledOptions?: Position[]): Option<Position>[] {
  return generateEnumOptions(Position, positionMap, disabledOptions);
}

/**
 * Gera opções para o enumerador SessionStatus
 */
export function getSessionStatusOptions(disabledOptions?: SessionStatus[]): Option<SessionStatus>[] {
  return generateEnumOptions(SessionStatus, sessionStatusMap, disabledOptions);
} 