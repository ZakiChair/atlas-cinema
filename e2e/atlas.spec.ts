import { test, expect, type Page } from '@playwright/test';
import { MOVEMENTS } from '../src/data';

async function dismissIntro(page: Page) {
  const explorer = page.getByRole('button', { name: 'Explorer' });
  if (await explorer.isVisible().catch(() => false)) await explorer.click();
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await dismissIntro(page);
});

test('la page charge et affiche les territoires', async ({ page }, testInfo) => {
  await expect(page.locator('[data-testid="territory"]')).toHaveCount(MOVEMENTS.length);
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `e2e/artifacts/${testInfo.project.name}-vue-initiale.png` });
});

test('clic territoire → panneau Nouvelle Vague', async ({ page }, testInfo) => {
  await page.locator('[data-testid="territory"][data-id="nouvelle-vague"]').click({ force: true });
  if (testInfo.project.name === 'mobile') {
    await expect(page.locator('[data-testid="panel-sheet"]')).toBeVisible();
    await expect(page.locator('[data-testid="panel-sheet"]')).toContainText('Nouvelle Vague');
  } else {
    await expect(page.locator('[data-testid="panel"]')).toBeVisible();
    await expect(page.locator('[data-testid="panel"]')).toContainText('Nouvelle Vague');
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'e2e/artifacts/desktop-niveau1-nouvelle-vague.png' });
  }
});

test('recherche « godard » → cinéaste + hash', async ({ page }) => {
  const inline = page.getByRole('combobox').first();
  if (!(await inline.isVisible().catch(() => false))) {
    await page.locator('[data-testid="search-open"]').click();
  }
  await page.getByRole('combobox').fill('godard');
  await page.getByRole('option').first().click();
  const panel = page.locator('[data-testid="panel"], [data-testid="panel-sheet"]');
  await expect(panel).toContainText('Jean-Luc Godard');
  await expect(page).toHaveURL(/#\/cineaste\/godard/);
});

test('navigation directe #/film/a-bout-de-souffle', async ({ page }, testInfo) => {
  await page.goto('/#/film/a-bout-de-souffle');
  await dismissIntro(page);
  const panel = page.locator('[data-testid="panel"], [data-testid="panel-sheet"]');
  await expect(panel).toContainText('À bout de souffle');
  if (testInfo.project.name === 'desktop') {
    await page.waitForTimeout(1100);
    await page.screenshot({ path: 'e2e/artifacts/desktop-niveau3-film.png' });
  }
});

test('filtre période 1900–1930 estompe la Nouvelle Vague', async ({ page }) => {
  await page.getByRole('button', { name: 'Filtres' }).click();
  const drawer = page.locator('aside[aria-label="Filtres"]');
  await expect(drawer).toBeVisible();
  const start = drawer.getByLabel('Année de début');
  const end = drawer.getByLabel('Année de fin');
  await start.fill('1900');
  await end.fill('1930');
  await expect(page.locator('[data-testid="territory"][data-id="nouvelle-vague"]')).toHaveClass(/dimmed/);
  await expect(page.locator('[data-testid="territory"][data-id="expressionnisme"]')).not.toHaveClass(/dimmed/);
});

test('mobile : bottom sheet après sélection', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile uniquement');
  await page.locator('[data-testid="territory"][data-id="nouvelle-vague"]').click({ force: true });
  await expect(page.locator('[data-testid="panel-sheet"]')).toBeVisible();
  // attendre la fin du fly-to : le zoom dépasse nettement l'ajustement (≈ 0.07 sur mobile)
  await expect
    .poll(
      async () => {
        const t = (await page.locator('g.world').getAttribute('transform')) ?? '';
        const m = /scale\(([\d.]+)\)/.exec(t);
        return m ? Number(m[1]) : 0;
      },
      { timeout: 3000 },
    )
    .toBeGreaterThan(0.2);
  await page.waitForTimeout(1300);
  await page.screenshot({ path: 'e2e/artifacts/mobile-territoire-selectionne.png' });
});

test('mobile : recherche en overlay', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile uniquement');
  await page.locator('[data-testid="search-open"]').click();
  await expect(page.locator('[data-testid="search-overlay"]')).toBeVisible();
  await page.locator('[data-testid="search-overlay"]').getByRole('combobox').fill('godard');
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'e2e/artifacts/mobile-recherche.png' });
  await page.locator('[data-testid="search-overlay"]').getByRole('option').first().click();
  await expect(page.locator('[data-testid="panel-sheet"]')).toContainText('Jean-Luc Godard');
});

test('intro : affichage, fermeture, persistance', async ({ page, context }) => {
  await context.clearCookies();
  await page.evaluate(() => localStorage.clear());
  await page.goto('/');
  const dialog = page.getByRole('dialog', { name: 'Introduction' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'Explorer' }).click();
  await expect(dialog).toBeHidden();
  await page.reload();
  await expect(page.getByRole('dialog', { name: 'Introduction' })).toHaveCount(0);
});
