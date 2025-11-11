import { Page } from '@playwright/test';

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

export interface BootstrapMockOptions {
  locale?: Locale;
  delay?: number;
}

/**
 * Mocks the /api/bootstrap endpoint for Playwright tests
 */
export async function mockBootstrap(
  page: Page,
  options: BootstrapMockOptions = {}
) {
  const { locale = DEFAULT_LOCALE, delay = 0 } = options;

  await page.route('**/api/client/bootstrap', async (route, request) => {
    const url = new URL(request.url());
    const localeParam = url.searchParams.get('locale') as Locale ?? locale;
    const tokens = LOCALE_TOKENS[localeParam] ?? LOCALE_TOKENS[DEFAULT_LOCALE];

    // Simulate network delay if needed
    if (delay > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        availableLocales: Object.keys(LOCALE_TOKENS),
        defaultLocale: DEFAULT_LOCALE,
        tokens,
      }),
    });
  });
}

/**
 * Mocks all API endpoints commonly used in tests
 */
export async function mockAllAPIs(page: Page) {
  // Mock bootstrap
  await mockBootstrap(page);

  // Mock blame endpoint
  await page.route('**/api/client/blame', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({}),
    });
  });

  // Mock locale endpoint
  await page.route('**/api/client/locale/:locale', async (route, request) => {
    const url = new URL(request.url());
    const pathParts = url.pathname.split('/');
    const localeId = pathParts[pathParts.length - 1] as Locale;
    const tokens = LOCALE_TOKENS[localeId];

    if (!tokens) {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({}),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          tokens,
        },
      }),
    });
  });
}
