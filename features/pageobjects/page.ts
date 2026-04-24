import { $, browser } from '@wdio/globals';

/**
 * Base class for all page objects.
 */
export default class Page {
  /**
   * Opens a path on the configured base URL.
   */
  public async open(path: string): Promise<void> {
    await browser.url(path);
  }

  /**
   * Dismisses the cookie banner if it's shown.
   * Missing banner is not an error, it may not appear if consent was stored,
   * or on return visits in the same session.
   */
  public async dismissCookieBanner(): Promise<void> {
    const acceptButton = $('#onetrust-accept-btn-handler');
    try {
      await acceptButton.waitForClickable({ timeout: 3000 });
      await acceptButton.click();
    } catch {
      // Continue if no banner
    }
  }
}
