
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import orderAPI from "../../apis/orderAPI";
import { useNavigate } from "react-router-dom";

// This value is from the props in the UI
const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, amount, showSpinner, orders, products }) => {
    const [{ isPending, options }, dispath] = usePayPalScriptReducer();
    const navigate = useNavigate()
    // useEffect(() => {
    //     dispath({
    //         type: 'resetOptions',
    //         value: {
    //             ...options, currency: currency
    //         }
    //     })
    // }, [currency, showSpinner, amount])

    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                fundingSource="paypal"
                style={{"layout":"vertical","label":"donate"}}
                disabled={false}
                forceReRender={[style, currency, amount]}
                createOrder={
                    (data, actions) => actions.order.create({
                        purchase_units: [
                            {amount: { currency_code: currency, value: amount}}
                        ]
                    }).then(orderId => orderId)}
                onApprove={(data, actions) => {
                    actions.order.capture().then(async(reponse) => {
                        if (reponse.status === 'COMPLETED') {
                            const res = await orderAPI.createOrder({orders, products})
                            if (res?.errCode === 1) {
                                alert(res?.message)
                                setTimeout(() => {
                                  window.location.reload();
                                }, 500);
                              }
                              else {
                                setTimeout(() => {
                                  window.location.reload();
                                }, 500);
                                navigate('/follow')
                              }
                        }
                    })
                }}
            />
        </>
    );
}

export default function Paypal({amount, errors, orders, products}) {
    console.log(errors)
    return (
        <div>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper currency={'USD'} amount={amount}  showSpinner={false} orders={orders} products={products}/>
            </PayPalScriptProvider>
        </div>
    );
}