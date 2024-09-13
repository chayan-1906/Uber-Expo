import {Alert} from "react-native";
import CustomButton from "@/components/CustomButton";
import {useCallback, useState} from "react";
import {useStripe} from "@stripe/stripe-react-native";
import {fetchAPI} from "@/lib/fetch";
import {User} from "@clerk/clerk-js/dist/types/core/resources/User";
import {MarkerData} from "@/types/type";

function Payment({user, driver}: { user: User, driver: MarkerData }) {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const [success, setSuccess] = useState(false);

    const initializePaymentSheet = async () => {
        const {error} = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            intentConfiguration: {
                mode: {
                    amount: 1099,
                    currencyCode: 'USD',
                },
                confirmHandler: confirmHandler
            }
        });
        if (error) {

        }
    }

    const openPaymentSheet = useCallback(async () => {
        await initializePaymentSheet();

        const {error} = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            setSuccess(true);
        }
    }, []);

    const confirmHandler = async (paymentMethod, _, intentCreationCallback) => {
        const {paymentIntent, customer} = await fetchAPI('/(api)/(stripe)/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: user?.fullName || user?.emailAddresses[0].emailAddress.split('@')[0],
                email: user?.emailAddresses[0].emailAddress,
                amount: driver?.price!,
                paymentMethodId: paymentMethod.id,
                // dds: driver.driver_id,
                // da: driver?.time!,
            }),
        });

        if (paymentIntent.client_secret) {
            const {result} = await fetchAPI('/(api)/(stripe)/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    payment_method_id: paymentMethod.id,
                    payment_intent_id: paymentIntent.id,
                    customer_id: customer,
                }),
            });

            if (result.client_secret) {
                // ride/create
            }
        }

        const {clientSecret, error} = await response.json();
        if (clientSecret) {
            intentCreationCallback({clientSecret})
        } else {
            intentCreationCallback({error})
        }
    }

    return (
        <>
            <CustomButton title={'Confirm Ride'} className={'my-10'} onPress={openPaymentSheet}/>
        </>
    );
}

export default Payment;
