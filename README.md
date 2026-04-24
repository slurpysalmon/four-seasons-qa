# Four Seasons QA Assessment

Automated test for the Four Seasons booking flow using WebdriverIO, Cucumber, and TypeScript.

Runs the scenario: find Cabo Del Sol, pick future dates, add a room to the cart, verify the cart.


## Running

Run these two commands:
`npm ci`,
`npm run wdio`

## Some Design Notes

- The calendar picks "30 days from today" at runtime rather than a hardcoded date.
- The Four Seasons site changes layout at narrow widths, and the availability tool disappears. Fixing the resolution keeps the test deterministic across machines.
- Price is checked in the cart as a properly formatted USD/CAD string rather than attempting to replicate fee math.

## Known Limitations

- Target date is assumed bookable.
- Calendar only shows two months, longer offsets would need different navigation, which isn't implemented.
- "Book Now" button skips the cart and goes to checkout. The test looks past these.

## CI

`.github/workflows/qa-tests.yml` defines a GitHub Actions workflow that runs on PRs, merges to main, and nightly.