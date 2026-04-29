import { $ , browser} from '@wdio/globals';
import Page from './page.js';

/**
 * Page object for the accommodations / availability page:
 * Shows rooms with their rate plans. Some rates require selecting bed options
 * before the "Add to Cart" button appears; others show "Add to Cart" directly.
 * The test handles both paths and adds the first available rate.
 */
export default class AvailabilityPage extends Page {
  /**
   * Waits for the availability page to finish rendering rates. Either
   * button appearing signals the page is ready for interaction.
   */
  public async waitForReady(): Promise<void> {
    // Wait for either add to cart or select bed options to appear.
    await $(
      'button[data-tracking-id="add-to-cart"], button[data-tracking-id="select-bed-options"]',
    ).waitForExist({ timeout: 30000 });
  }

  /**
   * Get the first room name for checking later.
   */
  public async getFirstRoomName(): Promise<string> {
    const roomHeading = $('a.fs-cta span.text-text-heading');
    await roomHeading.waitForDisplayed({ timeout: 10000 });
    return (await roomHeading.getText()).trim();
  }

  /**
   * Adds the first available room to the cart. The default
   * bed option is accepted, radio buttons are not manipulated.
   */
  public async addFirstRoomToCart(): Promise<void> {
    await this.waitForReady();

    const firstSelectBedOptions = $(
      'button[data-tracking-id="select-bed-options"]',
    );
    if (await firstSelectBedOptions.isExisting()) {
      await firstSelectBedOptions.scrollIntoView({ block: 'center' });
      await firstSelectBedOptions.waitForClickable({ timeout: 10000 });
      await firstSelectBedOptions.click();
    }

    const firstAddToCart = $('button[data-tracking-id="add-to-cart"]');
    await firstAddToCart.waitForDisplayed({ timeout: 20000 });
    await firstAddToCart.scrollIntoView({ block: 'center' });
    await firstAddToCart.waitForClickable({ timeout: 20000 });
    await firstAddToCart.click();

    // Let cart populate
    await browser.pause(3000);
  }
}
