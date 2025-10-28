export class TokenService {

  getAvailableLocales() {
    return ['en-CA', 'fr-CA', 'es-MX'];
  }

  getTokensForLocale(locale: string) {
    console.log('getTokensForLocale', locale);

    return {
      'blame-form.title': 'Blame Assignment',
      'blame-form.description': 'Don\'t worry! Exponential Blame will soon be assigned...',
      'blame-form.assign-button-label': 'Assign Blame',
      'blame-form.decline-button-label': 'Decline Blame',
    };
  }

}

export const tokenService = new TokenService();
