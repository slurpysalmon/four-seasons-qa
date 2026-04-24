export class DateHelper {
  /**
   * Returns a date N days from today, formatted as YYYY_MM_DD
   * to match the Four Seasons calendar button.
   */
  public static daysFromToday(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}_${mm}_${dd}`;
  }
}