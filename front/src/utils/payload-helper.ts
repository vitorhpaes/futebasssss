/**
 * Limpa um objeto de payload, removendo valores nulos, undefined ou strings vazias
 * e convertendo strings vazias para null conforme necessário
 * 
 * @param data Objeto a ser limpo
 * @param config Configurações de limpeza
 * @returns Objeto limpo
 */
export function cleanPayload<T extends Record<string, any>>(
  data: T, 
  config: {
    /**
     * Se true, converte strings vazias para null em vez de removê-las
     */
    emptyStringsToNull?: boolean;
    /**
     * Se true, remove todas as propriedades null
     */
    removeNull?: boolean;
    /**
     * Se true, remove todas as propriedades undefined
     */
    removeUndefined?: boolean;
    /**
     * Lista de campos que devem ser sempre incluídos, mesmo que sejam vazios/null/undefined
     */
    alwaysInclude?: string[];
  } = {}
): Partial<T> {
  const {
    emptyStringsToNull = true,
    removeNull = true,
    removeUndefined = true,
    alwaysInclude = []
  } = config;

  return Object.entries(data).reduce<Partial<T>>((acc, [key, value]) => {
    // Se o campo deve ser sempre incluído, incluí-lo independentemente do valor
    if (alwaysInclude.includes(key)) {
      // @ts-expect-error - Ignorando erro de tipo, pois sabemos que a chave é válida
      acc[key] = value;
      return acc;
    }

    // Processar string vazia
    if (typeof value === 'string' && value.trim() === '') {
      if (emptyStringsToNull) {
        // @ts-expect-error - Ignorando erro de tipo, pois sabemos que a chave é válida
        acc[key] = null;
      }
      return acc;
    }

    // Remover valores null se configurado
    if (value === null && removeNull) {
      return acc;
    }

    // Remover valores undefined se configurado
    if (value === undefined && removeUndefined) {
      return acc;
    }

    // Incluir outros valores
    // @ts-expect-error - Ignorando erro de tipo, pois sabemos que a chave é válida
    acc[key] = value;
    return acc;
  }, {});
}

/**
 * Hook personalizado para usar com formulários do Formik
 * 
 * Exemplo de uso:
 * 
 * const { handleSubmit } = useFormSubmit({
 *   onSubmit: async (cleanedValues) => {
 *     await api.post('/endpoint', cleanedValues);
 *   }
 * });
 * 
 * // No formulário:
 * <form onSubmit={formik.handleSubmit((values) => handleSubmit(values))}>
 */
export function prepareFormSubmission<T extends Record<string, any>>(
  values: T,
  options?: Parameters<typeof cleanPayload>[1]
) {
  return cleanPayload(values, options);
} 