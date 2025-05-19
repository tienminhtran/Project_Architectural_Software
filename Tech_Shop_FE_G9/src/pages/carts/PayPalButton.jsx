import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess }) => {
    return (
        <PayPalScriptProvider options={{ "client-id": "AZZOTiWCMPZoQH40DS6YTM8jTSPVxhHh87714-dKU98hWOMd6ZnaTlmSY35C6j1IgnHx7QUPKgJpKmCU" }}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: amount,
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        onSuccess(details);
                    });
                }}
                onError={(err) => {
                    console.error("PayPal Checkout onError", err);
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;