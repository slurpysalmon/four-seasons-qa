Feature: Hotel booking flow
  As a guest planning a stay
  I want to find a hotel, select a room, and add it to my cart
  So that I can proceed to booking with confidence that my selection is correct

  Scenario: Add a room to the cart from the Cabo Del Sol page
    Given I am on the Four Seasons find a hotel page
    When I expand the "North America" region
    And I select the hotel with handle "cabodelsol"
    And I check rates for a stay 14 days from today for 2 nights
    And I add the first available room to my cart
    And I open the cart
    Then the cart displays the selected room with a valid total price
    And the cart room name matches the selected room