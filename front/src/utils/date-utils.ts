import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/pt-br';

// Configurando plugins do dayjs
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

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
export const formatDateTime = (dateString: string, format = 'DD/MM/YYYY HH:mm') => {
  return dayjs(dateString).format(format);
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

export default dayjs; 