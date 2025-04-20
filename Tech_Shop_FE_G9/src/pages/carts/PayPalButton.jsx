import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PayPalButton = ({ amount, onSuccess }) => {
    return (
        <PayPalScriptProvider options={{ "client-id": "AYV3ya0xREirvhpQduCGTycmSjTNWUxK5q5H_Dntq5Vf67vDkg5hDralM7Iko__TiyYqwT_I5c-ZaYMc" }}>
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
