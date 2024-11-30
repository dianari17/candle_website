import React from 'react';
import Fastlane from './checkout.tsx';

interface FastlaneComponents {
    identity: any;
    profile: any;
    FastlanePaymentComponent: React.ComponentType<any>;
    FastlaneWatermarkComponent: React.ComponentType<any>;
}

interface Address {
    addressLine1?: string;
    addressLine2?: string;
    adminArea2?: string;
    adminArea1?: string;
    postalCode?: string;
    countryCode?: string;
}

interface Name {
    firstName?: string;
    lastName?: string;
    fullName?: string;
}

interface PhoneNumber {
    countryCode?: string;
    nationalNumber?: string;
}

interface AddressSummaryObjects {
    address: Address;
    name: Name;
    phoneNumber: PhoneNumber;
}

declare global {
    interface Window {
        paypal: {
            Fastlane: (options: any) => Promise<FastlaneComponents>;
        };
    }
}

async function initFastlane() {
    try {
        /**
         * ######################################################################
         * Initialize Fastlane components
         * ######################################################################
         */

        const {
            identity,
            profile,
            FastlanePaymentComponent,
            FastlaneWatermarkComponent,
        } = await window.paypal.Fastlane({
            // shippingAddressOptions: {
            //   allowedLocations: [],
            // },
            // cardOptions: {
            //   allowedBrands: [],
            // },
        });

        
        //Frontend team can you fix this, as I'm not sure how to implement our react components to fix the errors here
        const paymentComponent =
            await FastlanePaymentComponent(); 
        (
            await FastlaneWatermarkComponent({
                includeAdditionalInfo: true,
            })
        ).render("#watermark-container"); 
        /**
         * ######################################################################
         * State & data required for Fastlane
         * ######################################################################
         */

        let memberAuthenticatedSuccessfully: boolean | undefined;
        let email: string | undefined;
        let shippingAddress: any;
        let paymentToken: string | undefined;

        /**
         * ######################################################################
         * Checkout form helpers
         * (this will be different for individual websites and will depend on how
         * your own checkout flow functions)
         * ######################################################################
         */

        const form = document.querySelector("form") as HTMLFormElement;
        const customerSection = document.getElementById("customer") as HTMLElement;
        const emailSubmitButton = document.getElementById(
            "email-submit-button"
        ) as HTMLButtonElement;
        const shippingSection = document.getElementById("shipping") as HTMLElement;
        const paymentSection = document.getElementById("payment") as HTMLElement;
        const checkoutButton = document.getElementById("checkout-button") as HTMLButtonElement;
        let activeSection = customerSection;

        const setActiveSection = (section: HTMLElement) => {
            activeSection.classList.remove("active");
            section.classList.add("active", "visited");
            activeSection = section;
        };

        const getAddressSummary = ({
            address: {
                addressLine1,
                addressLine2,
                adminArea2,
                adminArea1,
                postalCode,
                countryCode,
            } = {},
            name: { firstName, lastName, fullName } = {},
            phoneNumber: { countryCode: telCountryCode, nationalNumber } = {},
        }: AddressSummaryObjects) => {
            const isNotEmpty = (field: any) => !!field;
            const summary = [
                fullName || [firstName, lastName].filter(isNotEmpty).join(" "),
                [addressLine1, addressLine2].filter(isNotEmpty).join(", "),
                [
                    adminArea2,
                    [adminArea1, postalCode].filter(isNotEmpty).join(" "),
                    countryCode,
                ]
                    .filter(isNotEmpty)
                    .join(", "),
                [telCountryCode, nationalNumber].filter(isNotEmpty).join(""),
            ];
            return summary.filter(isNotEmpty).join("\n");
        };

        const setShippingSummary = (address: any) => {
            const summaryElement = shippingSection.querySelector(".summary") as HTMLElement | null;
            
            if (summaryElement) {
                summaryElement.innerText = getAddressSummary(address);
            } else {
                console.warn('No .summary element found');
            }
        };

        /**
         * ######################################################################
         * Checkout form interactable elements
         * (this will be different for individual websites and will depend on how
         * your own checkout flow functions)
         * ######################################################################
         */

        emailSubmitButton.addEventListener(
            "click",
            async () => {
                // disable button until authentication succeeds or fails
                emailSubmitButton.setAttribute("disabled", "");

                // reset form & state
                email = (form.elements.namedItem("email") as HTMLInputElement).value;
                form.reset();
                document.getElementById("email-input")!.value = email;
                shippingSection.classList.remove("visited");
                setShippingSummary({});
                paymentSection.classList.remove("visited", "pinned");

                memberAuthenticatedSuccessfully = undefined;
                shippingAddress = undefined;
                paymentToken = undefined;

                // render payment component
                paymentComponent.render("#payment-component");

                try {
                    // identify and authenticate Fastlane members
                    const { customerContextId } =
                        await identity.lookupCustomerByEmail(email);

                    if (customerContextId) {
                        const authResponse =
                            await identity.triggerAuthenticationFlow(
                                customerContextId
                            );
                        console.log("Auth response:", authResponse);

                        // save profile data
                        if (authResponse?.authenticationState === "succeeded") {
                            memberAuthenticatedSuccessfully = true;
                            shippingAddress =
                                authResponse.profileData.shippingAddress;
                            paymentToken = authResponse.profileData.card;
                        }
                    } else {
                        // user was not recognized
                        console.log("No customerContextId");
                    }

                    // update form UI
                    customerSection.querySelector(".summary")!.innerText = email;
                    if (shippingAddress) {
                        setShippingSummary(shippingAddress);
                    }
                    if (memberAuthenticatedSuccessfully) {
                        shippingSection.classList.add("visited");
                        paymentSection.classList.add("pinned");
                        setActiveSection(paymentSection);
                    } else {
                        setActiveSection(shippingSection);
                    }
                } finally {
                    // re-enable button once authentication succeeds or fails
                    emailSubmitButton.removeAttribute("disabled");
                }
            }
        ); 
        // enable button after adding click event listener
        emailSubmitButton.removeAttribute("disabled");

        document
            .getElementById("email-edit-button")!
            .addEventListener("click", () => setActiveSection(customerSection));

        document
            .getElementById("shipping-submit-button")!
            .addEventListener("click", () => {
                // extract form values
                const firstName = (form.elements.namedItem("given-name") as HTMLInputElement).value;
                const lastName = (form.elements.namedItem("family-name") as HTMLInputElement).value;
                const addressLine1 = (form.elements.namedItem("address-line1") as HTMLInputElement).value;
                const addressLine2 = (form.elements.namedItem("address-line2") as HTMLInputElement).value;
                const adminArea2 = (form.elements.namedItem("address-level2") as HTMLInputElement).value;
                const adminArea1 = (form.elements.namedItem("address-level1") as HTMLInputElement).value;
                const postalCode = (form.elements.namedItem("postal-code") as HTMLInputElement).value;
                const countryCode = (form.elements.namedItem("country") as HTMLInputElement).value;
                const telCountryCode = (form.elements.namedItem("tel-country-code") as HTMLInputElement).value;
                const telNational = (form.elements.namedItem("tel-national") as HTMLInputElement).value;

                // update state & form UI
                shippingAddress = {
                    address: {
                        addressLine1,
                        addressLine2,
                        adminArea2,
                        adminArea1,
                        postalCode,
                        countryCode,
                    },
                    name: {
                        firstName,
                        lastName,
                        fullName: [firstName, lastName]
                            .filter((field) => !!field)
                            .join(" "),
                    },
                    phoneNumber: {
                        countryCode: telCountryCode,
                        nationalNumber: telNational,
                    },
                };
                setShippingSummary(shippingAddress);
                paymentComponent.setShippingAddress(shippingAddress);
                setActiveSection(paymentSection);
            });

        document
            .getElementById("shipping-edit-button")!
            .addEventListener("click", async () => {
                if (memberAuthenticatedSuccessfully) {
                    // open Shipping Address Selector for Fastlane members
                    const { selectionChanged, selectedAddress } =
                        await profile.showShippingAddressSelector();

                    if (selectionChanged) {
                        // selectedAddress contains the new address
                        console.log("New address:", selectedAddress);

                        // update state & form UI
                        shippingAddress = selectedAddress;
                        setShippingSummary(shippingAddress);
                        paymentComponent.setShippingAddress(shippingAddress);
                    } else {
                        // selection modal was dismissed without selection
                    }
                } else {
                    setActiveSection(shippingSection);
                }
            });

        document
            .getElementById("payment-edit-button")!
            .addEventListener("click", () => setActiveSection(paymentSection));

        checkoutButton.addEventListener("click", async () => {
            // disable button until transaction succeeds or fails
            checkoutButton.setAttribute("disabled", "");

            try {
                // get payment token
                paymentToken = await paymentComponent.getPaymentToken();
                console.log("Payment token:", paymentToken);

                // send transaction details to back-end
                const headers = new Headers();
                headers.append("Content-Type", "application/json");
                const isShippingRequired = (form.elements.namedItem("shipping-required") as HTMLInputElement).value;
                const body = JSON.stringify({
                    ...(isShippingRequired && { shippingAddress }),
                    paymentToken,
                });
                const response = await fetch("transaction", {
                    method: "POST",
                    headers,
                    body,
                });
                const { result, error } = await response.json();

                if (error) {
                    console.error(error);
                } else {
                    if (result.id) {
                        const message = `Order ${result.id}: ${result.status}`;
                        console.log(message);
                        alert(message);
                    } else {
                        console.error(result);
                    }
                }
            } finally {
                // re-enable button once transaction succeeds or fails
                checkoutButton.removeAttribute("disabled");
            }
        });
    } catch (error) {
        console.error(error);
    }
}

initFastlane(); 