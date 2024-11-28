import React from 'react';

const FastlanePayPalIntegration: React.FC = () => {
  return (
    <div>
      <title>Fastlane - PayPal Integration - Quick Start</title>

      <link rel="stylesheet" href="styles.css" />
      
      <form>
        <h1>Fastlane - PayPal Integration - Quick Start</h1>

        <section id="customer" className="active visited">
          <div className="header">
            <h2>Customer</h2>
            <button id="email-edit-button" type="button" className="edit-button">
              Edit
            </button>
          </div>
          <div className="summary"></div>
          <div className="email-container">
            <fieldset className="email-input-with-watermark">
              <input
                id="email-input"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
              />
              <div id="watermark-container"></div>
            </fieldset>
            <button
              id="email-submit-button"
              type="button"
              className="submit-button"
              disabled
            >
              Continue
            </button>
          </div>
        </section>

        <hr />

        <section id="shipping">
          <div className="header">
            <h2>Shipping</h2>
            <button id="shipping-edit-button" type="button" className="edit-button">
              Edit
            </button>
          </div>
          <div className="summary"></div>
          <fieldset>
            <span>
              <input
                id="shipping-required-checkbox"
                name="shipping-required"
                type="checkbox"
                checked
              />
              <label htmlFor="shipping-required-checkbox">
                This purchase requires shipping
              </label>
            </span>
            <input name="given-name" placeholder="First name" autoComplete="given-name" />
            <input name="family-name" placeholder="Last name" autoComplete="family-name" />
            <input name="address-line1" placeholder="Street address" autoComplete="address-line1" />
            <input name="address-line2" placeholder="Apt., ste., bldg. (optional)" autoComplete="address-line2" />
            <input name="address-level2" placeholder="City" autoComplete="address-level2" />
            <input name="address-level1" placeholder="State" autoComplete="address-level1" />
            <input name="postal-code" placeholder="ZIP code" autoComplete="postal-code" />
            <input name="country" placeholder="Country" autoComplete="country" />
            <input name="tel-country-code" placeholder="Country calling code" autoComplete="tel-country-code" />
            <input name="tel-national" type="tel" placeholder="Phone number" autoComplete="tel-national" />
          </fieldset>
          <button id="shipping-submit-button" type="button" className="submit-button">
            Continue
          </button>
        </section>

        <hr />

        <section id="payment">
          <div className="header">
            <h2>Payment</h2>
            <button id="payment-edit-button" type="button" className="edit-button">
              Edit
            </button>
          </div>
          <fieldset>
            <div id="payment-component"></div>
          </fieldset>
        </section>

        <button id="checkout-button" type="button" className="submit-button">
          Checkout
        </button>
      </form>

      <script
        src="https://www.paypal.com/sdk/js?client-id=AYOeyCQvilLVKJGjslZfFSi_Nkl7A6OfXNarj5lS55iUcQXMhpp3AypVjAVkS_qvPcO5D415b9SnBFuN&components=buttons%2Cfastlane"
        data-sdk-client-token="eyJraWQiOiJkMTA2ZTUwNjkzOWYxMWVlYjlkMTAyNDJhYzEyMDAwMiIsInR5cCI6IkpXVCIsImFsZyI6IkVTMjU2In0.eyJpc3MiOiJodHRwczovL2FwaS5zYW5kYm94LnBheXBhbC5jb20iLCJhdWQiOlsiaHR0cHM6Ly9hcGkuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJwYXlwYWwuY29tIl0sInN1YiI6IjJUSFY2R0VSVFZRRUUiLCJhY3IiOlsiY2xpZW50Il0sInNjb3BlIjpbIkJyYWludHJlZTpWYXVsdCJdLCJvcHRpb25zIjp7fSwiYXoiOiJjY2cxOC5zbGMiLCJleHRlcm5hbF9pZCI6WyJQYXlQYWw6MlRIVjZHRVJUVlFFRSIsIkJyYWludHJlZTozMms4amNqNnJ5MnF2YmZ0Il0sImV4cCI6MTczMjgxMzk5NywiaWF0IjoxNzMyODEzMDk3LCJqdGkiOiJVMkFBSVhPOWdYcVJkRHd6aHZJbEdaRFNBUVQ5eGFNb3M3WmljNVo5SC1rVWJpYXVlYnRQVDd1WjFhMDVoOEdKSHVNYXprd3R5UFVndVRMU1lpemppWkhDNzRCdXQxa0xMSldYRUZWcjhKeUs5eEd1QUtqTGpZRnIyNTdqMWdZdyJ9.2lmYxOGNou8ZKut0-H1-x-AAm6MD4q0YhujBhHp8YkyIfC5nYabunhK6rFuBKlxtZiUCl8rA8fSp4BslTKG_dw"
        data-sdk-integration-source="developer-studio"
        defer
      ></script>

      <script src="app.js" defer></script>
    </div>
  );
};

export default FastlanePayPalIntegration;
