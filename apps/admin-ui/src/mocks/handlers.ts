import { delay, http, HttpResponse } from 'msw';

const DEFAULT_LOCALE = 'en-CA';

const LOCALE_TOKENS = {
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

type Locale = keyof typeof LOCALE_TOKENS;

export const handlers = [

  http.get('/api/bootstrap', async ({ request }) => {
    await delay(500);

    const { searchParams } = new URL(request.url);
    const localeId = searchParams.get('locale') as Locale ?? DEFAULT_LOCALE;
    const tokens = LOCALE_TOKENS[localeId] ?? LOCALE_TOKENS[DEFAULT_LOCALE];

    return HttpResponse.json({
      data: {
        availableLocales: Object.keys(LOCALE_TOKENS),
        defaultLocale: DEFAULT_LOCALE,
        tokens,
      },
    });
  }),

  http.get<{ localeId: Locale }>('/api/locale/:localeId', async ({ params }) => {
    await delay(500);

    const { localeId } = params;
    const tokens = LOCALE_TOKENS[localeId];

    if (!tokens) {
      return HttpResponse.json({}, { status: 404 });
    }

    return HttpResponse.json({
      data: {
        tokens,
      },
    });
  }),

  http.post('/api/blame', async () => {
    await delay(500 + Math.random() * 1000);

    return HttpResponse.json({});
  }),

];
