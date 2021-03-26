import { PayPalButton } from "react-paypal-button-v2";

import Swal from "sweetalert2";
import { ITicketOrder } from "../services/Database";

const ReactPayPalButton = (props: { amount: number; flightId: string; order: ITicketOrder }) => {
    return (
        <PayPalButton
            amount={props.amount}
            shippingPreference="NO_SHIPPING"
            options={{ clientId: "AYhSi6YlNehvvHZkT0AII6-MWBsmmloPWjsC8jdlhyDx6ROO_rqTRrzNwic3EJLPVpbPobeQOsXSaUee" }}
            onSuccess={async (details, data) => {
                fetch("/api/purchase", {
                    method: "POST",
                    body: JSON.stringify({
                        orderID: data.orderID,
                        flightId: props.flightId,
                        order: props.order,
                    }),
                });
                await Swal.fire("Sucess!", "Your tickets have been sucessfuly bought", "success");
                window.location.href = "/myReservations";
            }}
            onError={() => {
                Swal.fire("Fail!", "Your purchase has failed", "error");
            }}
        />
    );
};
export default ReactPayPalButton;
