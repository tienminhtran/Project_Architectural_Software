import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess }) => {
    return (
        <PayPalScriptProvider options={{ "client-id": "AWoJvwAp7pcTiCTnpWoTZoLUPtxGoASnj8UPU3EdQnbkBUXHhYRy3XpCDLnB3NI41pr13s5OB6XZrOdy" }}>
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