import { PayPalButton } from "react-paypal-button-v2";

const ReactPayPalButton = (props) => {
    return (
        <PayPalButton
            amount="0.01"
            shippingPreference="NO_SHIPPING"
            options={{ clientId: "AYhSi6YlNehvvHZkT0AII6-MWBsmmloPWjsC8jdlhyDx6ROO_rqTRrzNwic3EJLPVpbPobeQOsXSaUee" }}
            onSuccess={(details, data) => {
                alert("Transaction completed by " + details.payer.name.given_name);
                return fetch("/api/purchase", {
                    method: "post",
                    body: JSON.stringify({
                        orderID: data.orderID,
                    }),
                });
            }}
        />
    );
};
export default ReactPayPalButton;
