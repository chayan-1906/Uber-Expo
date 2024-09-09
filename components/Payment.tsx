import {Text} from "react-native";
import CustomButton from "@/components/CustomButton";
import {useCallback} from "react";
import {useStripe} from "@stripe/stripe-react-native";

function Payment() {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();

    const openPaymentSheet = useCallback(async () => {
        const {error} = await initPaymentSheet({
            merchantDisplayName: "Example, Inc.",
            intentConfiguration: {
                mode: {
                    amount: 1099,
                    currencyCode: 'USD',
                },
                confirmHandler: confirmHandler,
            }
        });
        if (error) {

        }
    }, []);

    const confirmHandler = async (paymentMethod, shouldSavePaymentMethod, intentCreationCallback) => {

    }

    return (
        <>
            <CustomButton title={'Confirm Ride'} className={'my-10'} onPress={openPaymentSheet}/>
            <Text>Payment</Text>
        </>
    );
}

export default Payment;
