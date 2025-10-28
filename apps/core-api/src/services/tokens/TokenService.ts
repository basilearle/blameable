export class TokenService {

  private TOKENS_BY_LOCALE: Record<string, Record<string, string>> = {
    'en-CA': {
      'blame-form.title': 'Blame Basil',
      'blame-form.description': 'Blame Basil is a simple web app that simulates a blame assignment process.',
      'blame-form.assign-button-label': 'Assign Blame',
      'blame-form.decline-button-label': 'Decline Blame',
      'blame-header.title': 'By Popular Demand.',
      'global.locale.en-CA': 'English',
      'global.locale.fr-CA': 'Français',
      'global.locale.es-MX': 'Española',
    },
    'fr-CA': {
      'blame-form.title': 'Blâmer Basil',
      'blame-form.description': 'Blâmer Basil est une application web simple qui simule un processus d\'attribution de blâme.',
      'blame-form.assign-button-label': 'Attribuer le blâme',
      'blame-form.decline-button-label': 'Refuser le blâme',
      'blame-header.title': 'À la demande générale.',
      'global.locale.en-CA': 'English',
      'global.locale.fr-CA': 'Français',
      'global.locale.es-MX': 'Española',
    },
    'es-MX': {
      'blame-form.title': 'Culpar a Basil',
      'blame-form.description': 'Culpar a Basil es una aplicación web simple que simula un proceso de asignación de culpa.',
      'blame-form.assign-button-label': 'Asignar culpa',
      'blame-form.decline-button-label': 'Rechazar culpa',
      'blame-header.title': 'A petición del público.',
      'global.locale.en-CA': 'English',
      'global.locale.fr-CA': 'Français',
      'global.locale.es-MX': 'Española',
    },
  };

  getAvailableLocales() {
    return Object.keys(this.TOKENS_BY_LOCALE);
  }

  getTokensForLocale(locale: string) {
    return this.TOKENS_BY_LOCALE[locale] as Record<string, string>;
  }

}

export const tokenService = new TokenService();
