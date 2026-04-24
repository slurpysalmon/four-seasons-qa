import { $ } from '@wdio/globals';
import Page from './page.js';

/**
 * Page object for the find-a-hotel landing page:
 * https://www.fourseasons.com/find_a_hotel_or_resort/
 *
 * Hotels are grouped by region under collapsible accordions (North America,
 * Europe, Asia-Pacific, etc.). The user expands a region, then clicks through
 * to a specific property.
 */
export default class FindHotelPage extends Page {
  /**
   * The accordion button for a region.
   */
  private regionAccordionButton(region: string) {
    return $(`button*=${region}`);
  }

  /**
   * The link to a specific hotel.
   */
  private hotelLink(handle: string) {
    return $(`a[href='/${handle}/']`);
  }

  /**
   * Navigates to the find a hotel page and handles the cookie banner.
   */
  public async load(): Promise<void> {
    await this.open('/find_a_hotel_or_resort/');
    await this.dismissCookieBanner();
  }

  /**
   * Expands the accordion for a region, if not already expanded.
   */
  public async expandRegion(region: string): Promise<void> {
    const button = this.regionAccordionButton(region);
    await button.scrollIntoView({ block: 'center' });
    await button.waitForClickable({ timeout: 5000 });

    // Check if accordion is already expanded, otherwise return.
    const isExpanded = await button.getAttribute('aria-expanded');
    if (isExpanded === 'true') return;

    await button.click();

    await button.waitUntil(
      async () => (await button.getAttribute('aria-expanded')) === 'true',
      {
        timeout: 5000,
        timeoutMsg: `Region "${region}" did not expand after click`,
      },
    );
  }

  /**
   * Clicks through to a specific hotel's page by URL handle.
   */
  public async selectHotelByHandle(handle: string): Promise<void> {
    const link = this.hotelLink(handle);
    await link.waitForDisplayed({ timeout: 5000 });
    await link.scrollIntoView({ block: 'center' });
    await link.waitForClickable({ timeout: 10000 });
    await link.click();
  }
}
