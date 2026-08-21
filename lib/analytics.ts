/**
 * Analytics events — arquitetura preparada para integração futura.
 * Configure IDs em variáveis de ambiente quando disponível.
 *
 * Exemplo de uso futuro:
 *   track('whatsapp_click', { location: 'hero' })
 */
type EventName =
  | 'whatsapp_click'
  | 'instagram_click'
  | 'cta_click'
  | 'section_view'
  | 'fleet_interact';

export function track(name: EventName, params?: Record<string, string | number>): void {
  if (typeof window === 'undefined') return;
  // Future: window.gtag?.('event', name, params)
  // Future: window.fbq?.('trackCustom', name, params)
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${name}`, params);
  }
}
