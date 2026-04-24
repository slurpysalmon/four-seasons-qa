import { $, browser } from '@wdio/globals';
import Page from './page.js';
import { DateHelper } from '../../utils/date-helper.js';

/**
 * Page object for a specific hotel's detail page:
 * https://www.fourseasons.com/cabodelsol/ (or any other handle).
 *
 * Has the availability tool: check-in/check-out date picker, guest
 * selector, and the Check Rates submission button. Submitting navigates
 * to the accommodations page.
 */
export default class HotelDetailPage extends Page {
  /**
   * The date-range field that opens the calendar when clicked.
   */
  private get dateField() {
    return $('#datefield-id');
  }

  /**
   * The "Done" button that closes the calendar after a range is selected.
   */
  private get calendarDoneButton() {
    return $('.flexdates-done-button');
  }

  /**
   * The Check Rates submit button, different from the one that opens the tool.
   */
  private get checkRatesButton() {
    return $('.form__submit-button');
  }

  /**
   * A day button in the calendar. Excludes neighboring-month copies,
   * each date appears twice in the two-month view (once in its own grid,
   * once as a preview in the adjacent month).
   */
  private calendarDayButton(date: string) {
    return $(
      `.FSHCalendarDay_button_${date}:not(.FSHCalendarView__month-view__days__day--neighboringMonth)`,
    );
  }

  /**
   * Opens availability panel if not open.
   */
  public async openAvailabilityPanel(): Promise<void> {
    if (!(await this.dateField.isDisplayed())) {
      await $('a.CAW-trigger').click();
      await this.dateField.waitForDisplayed({ timeout: 10000 });
    }
  }

  /**
   * Selects a check-in and check-out date via the calendar, then confirms the selection.
   */
  public async selectStayDates(
    daysFromToday: number,
    nights: number,
  ): Promise<void> {
    await this.openAvailabilityPanel();

    const checkIn = DateHelper.daysFromToday(daysFromToday);
    const checkOut = DateHelper.daysFromToday(daysFromToday + nights);

    await this.dateField.click();

    await this.calendarDayButton(checkIn).click();
    await this.calendarDayButton(checkOut).click();

    await this.calendarDoneButton.waitForClickable({ timeout: 5000 });
    await this.calendarDoneButton.click();
  }

  /**
   * Clicks "Check Rates" to submit the availability search. This navigates
   * to the accommodations page.
   */
  public async submitCheckRates(): Promise<void> {
    await this.checkRatesButton.waitForClickable({ timeout: 10000 });
    await this.checkRatesButton.click();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/accommodations/'),
      {
        timeout: 20000,
        timeoutMsg:
          'Did not navigate to /accommodations/ after submitting Check Rates',
      },
    );
  }
}
