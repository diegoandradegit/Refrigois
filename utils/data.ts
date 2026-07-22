const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

/**
 * Formata "2026-07-22" como "22 de julho de 2026".
 *
 * Escrito a mao de proposito, sem toLocaleDateString: o resultado daquela
 * funcao depende da biblioteca de idioma instalada, que nao e a mesma no
 * servidor que gera o HTML e no navegador que o recebe. Quando as duas
 * discordam, a data "pula" ao carregar a pagina.
 *
 * Tambem evita fuso: a data e lida como texto, nao como instante no tempo.
 */
export function formatarData(iso: string): string {
  if (!iso) return '';
  const [ano, mes, dia] = iso.slice(0, 10).split('-').map(Number);
  if (!ano || !mes || !dia) return iso;
  return `${String(dia).padStart(2, '0')} de ${MESES[mes - 1]} de ${ano}`;
}
