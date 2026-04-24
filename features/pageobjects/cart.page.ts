import { $ } from '@wdio/globals';
import Page from './page.js';

/**
 * Page object for the cart drawer.
 *
 * Clicking the cart icon opens a .ItineraryOverlay in place, a drawer, not a new page.
 */
export default class CartPage extends Page {
  /**
   * The cart icon in the site header. Clicking this opens the drawer.
   */
  private get cartIcon() {
    return $('#shopping_cart_icon');
  }

  /**
   * The drawer container.
   */
  private get drawer() {
    return $('.ItineraryOverlay');
  }

  /**
   * The room name inside the drawer. Use .ItineraryOverlay so we
   * don't accidentally match a "text-subtitle2" element elsewhere on the page.
   */
  private get roomName() {
    return $('.ItineraryOverlay span.text-subtitle2');
  }

  /**
   * The estimated total row's price element. The cart has both a 
   * price and an estimated total, this selector targets the total.
   */
  private get estimatedTotal() {
    return $('.ItineraryOverlay span.text-subtitle1');
  }

  /**
   * Opens the cart drawer by clicking the cart icon, then waits for the drawer to become visible.
   */
  public async open(): Promise<void> {
    await this.cartIcon.waitForClickable({ timeout: 10000 });
    await this.cartIcon.click();
    await this.drawer.waitForDisplayed({ timeout: 10000 });
  }

  /**
   * Returns the displayed room name in the cart.
   */
  public async getRoomName(): Promise<string> {
    await this.roomName.waitForDisplayed({ timeout: 10000 });
    return (await this.roomName.getText()).trim();
  }

  /**
   * Returns the estimated total as displayed, e.g. USD 4,220.83.
   */
  public async getEstimatedTotal(): Promise<string> {
    await this.estimatedTotal.waitForDisplayed({ timeout: 10000 });
    return (await this.estimatedTotal.getText()).trim();
  }
}
