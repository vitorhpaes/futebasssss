export enum Position {
  DEFENDER = 'Defender',
  MIDFIELDER = 'Midfielder',
  FORWARD = 'Forward',
}

export function translatePosition(
  position: Position,
  language: string,
): string {
  const translations: { [key: string]: { [key in Position]: string } } = {
    pt: {
      [Position.DEFENDER]: 'Zagueiro',
      [Position.MIDFIELDER]: 'Meio-campista',
      [Position.FORWARD]: 'Atacante',
    },
  };

  return translations[language]?.[position] || position;
}
