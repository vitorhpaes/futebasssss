import { Transform, TransformFnParams } from 'class-transformer';

/**
 * Transformer para converter strings vazias em null
 * Decorador que pode ser usado em qualquer propriedade de DTO para converter strings vazias em null
 */
export function TransformEmptyToNull() {
  return Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'string' && value.trim() === '') {
      return null;
    }
    return value;
  });
}

/**
 * Transformer para converter strings vazias em undefined
 * Útil para propriedades opcionais que não devem ser enviadas se vazias
 */
export function TransformEmptyToUndefined() {
  return Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'string' && value.trim() === '') {
      return undefined;
    }
    return value;
  });
}

/**
 * Transformer para trim em strings
 */
export function TransformTrim() {
  return Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'string') {
      return value.trim();
    }
    return value;
  });
}

/**
 * Combina transformação de trim e conversão para null
 */
export function TransformTrimAndEmptyToNull() {
  return Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed === '' ? null : trimmed;
    }
    return value;
  });
}

/**
 * Combina transformação de trim e conversão para undefined
 */
export function TransformTrimAndEmptyToUndefined() {
  return Transform(({ value }: TransformFnParams) => {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed === '' ? undefined : trimmed;
    }
    return value;
  });
}
