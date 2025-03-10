import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

// Configurando plugins do dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

// Configurando locale para pt-br
dayjs.locale('pt-br');

/**
 * Formata uma data para exibição no formato brasileiro
 * @param dateString - String ISO de data
 * @param format - Formato de saída (opcional)
 * @returns String formatada da data
 */
export const formatDate = (dateString: string, format = 'DD/MM/YYYY') => {
  return dayjs(dateString).format(format);
};

/**
 * Formata uma data e hora para exibição no formato brasileiro
 * @param dateString - String ISO de data
 * @param format - Formato de saída (opcional)
 * @returns String formatada da data e hora
 */
export const formatDateTime = (date: string | Date, format: string = 'DD/MM/YYYY'): string => {
  return dayjs(date).format(format);
};

/**
 * Combina data e hora em um formato ISO
 * @param date - String de data (YYYY-MM-DD)
 * @param time - String de hora (HH:MM)
 * @returns String ISO da data e hora combinadas
 */
export const combineDateAndTime = (date: string, time: string): string => {
  if (!date || !time) return '';
  
  // Combina a data e hora
  return dayjs(`${date}T${time}`).toISOString();
};

/**
 * Separa uma data ISO em componentes de data e hora
 * @param isoString - String ISO de data
 * @returns Objeto com data e hora separados
 */
export const splitDateTime = (isoString: string): { date: string, time: string } => {
  if (!isoString) return { date: '', time: '' };
  
  const dateTime = dayjs(isoString);
  
  return {
    date: dateTime.format('YYYY-MM-DD'),
    time: dateTime.format('HH:mm')
  };
};

/**
 * Converte uma string de data para um objeto Date
 * @param dateString - String de data
 * @returns Objeto Date
 */
export const parseDate = (dateString: string): Date => {
  return dayjs(dateString).toDate();
};

/**
 * Verifica se uma data é válida
 * @param date - Data a ser verificada
 * @returns Verdadeiro se for válida
 */
export const isValidDate = (date: string | Date): boolean => {
  return dayjs(date).isValid();
};

/**
 * Adiciona um período a uma data
 * @param date - Data base
 * @param amount - Quantidade a adicionar
 * @param unit - Unidade (day, month, year, etc.)
 * @returns Nova data
 */
export const addToDate = (
  date: string | Date, 
  amount: number, 
  unit: 'day' | 'month' | 'year' | 'hour' | 'minute'
): Date => {
  return dayjs(date).add(amount, unit).toDate();
};

/**
 * Obtém a diferença entre duas datas em uma unidade específica
 * @param dateA - Primeira data
 * @param dateB - Segunda data
 * @param unit - Unidade para cálculo da diferença
 * @returns Diferença numérica
 */
export const getDiff = (
  dateA: string | Date,
  dateB: string | Date,
  unit: 'day' | 'month' | 'year' | 'hour' | 'minute'
): number => {
  return dayjs(dateA).diff(dayjs(dateB), unit);
};

/**
 * Formata uma data relativa (ex: "há 2 dias")
 * @param date - Data a ser formatada
 * @returns String formatada
 */
export const formatRelative = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

/**
 * Verifica se uma data está no passado
 * @param date - Data a ser verificada
 * @returns Verdadeiro se estiver no passado
 */
export const isPast = (date: string | Date): boolean => {
  return dayjs(date).isBefore(dayjs());
};

/**
 * Verifica se uma data está no futuro
 * @param date - Data a ser verificada
 * @returns Verdadeiro se estiver no futuro
 */
export const isFuture = (date: string | Date): boolean => {
  return dayjs(date).isAfter(dayjs());
};

/**
 * Formata uma duração em minutos para o formato HH:MM
 * @param minutes - Duração em minutos
 * @returns String formatada em HH:MM
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export default dayjs; 