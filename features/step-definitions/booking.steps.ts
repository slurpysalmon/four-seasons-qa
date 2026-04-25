import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';

import FindHotelPage from '../pageobjects/find-hotel.page.js';
import HotelDetailPage from '../pageobjects/hotel-detail.page.js';
import AvailabilityPage from '../pageobjects/availability.page.js';
import CartPage from '../pageobjects/cart.page.js';

const findHotelPage = new FindHotelPage();
const hotelDetailPage = new HotelDetailPage();
const availabilityPage = new AvailabilityPage();
const cartPage = new CartPage();

Given('I am on the Four Seasons find a hotel page', async () => {
  await findHotelPage.load();
});

When('I expand the {string} region', async (region: string) => {
  await findHotelPage.expandRegion(region);
});

When('I select the hotel with handle {string}', async (handle: string) => {
  await findHotelPage.selectHotelByHandle(handle);
});

When(
  'I check rates for a stay {int} days from today for {int} nights',
  async (daysFromToday: number, nights: number) => {
    await hotelDetailPage.selectStayDates(daysFromToday, nights);
    await hotelDetailPage.submitCheckRates();
  },
);

When('I add the first available room to my cart', async () => {
  await availabilityPage.addFirstRoomToCart();
});

When('I open the cart', async () => {
  await cartPage.open();
});

Then('the cart displays the selected room with a valid total price', async () => {
  const roomName = await cartPage.getRoomName();
  const total = await cartPage.getEstimatedTotal();

  expect(roomName.length).toBeGreaterThan(0);
  expect(total.length).toBeGreaterThan(4);
  expect(total).toMatch(/USD|CAD/);
});