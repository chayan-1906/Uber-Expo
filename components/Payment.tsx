import {Alert, Image, Text, View} from "react-native";
import CustomButton from "@/components/CustomButton";
import {useCallback, useState} from "react";
import {useStripe} from "@stripe/stripe-react-native";
import {fetchAPI} from "@/lib/fetch";
import {PaymentProps} from "@/types/type";
import {useLocationStore} from "@/store";
import {useAuth} from "@clerk/clerk-expo";
import {ReactNativeModal} from "react-native-modal";
import {images} from "@/constants";
import {useRouter} from "expo-router";
import routes from "@/constants/Routes";

function Payment({fullName, email, amount, driverId, rideTime}: PaymentProps) {
    const {initPaymentSheet, presentPaymentSheet} = useStripe();
    const {userId} = useAuth();
    const {userAddress, userLatitude, userLongitude, destinationAddress, destinationLatitude, destinationLongitude} = useLocationStore();
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const initializePaymentSheet = async () => {
        console.log('initializePaymentSheet');
        const {error} = await initPaymentSheet({
            merchantDisplayName: "Ryde Inc.",
            intentConfiguration: {
                mode: {
                    amount: Number(amount) * 100,
                    currencyCode: 'USD',
                },
                confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
                    const {paymentIntent, customer} = await fetchAPI('/(api)/(stripe)/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: fullName || email.split('@')[0],
                            email: email,
                            amount: amount,
                            paymentMethodId: paymentMethod.id,
                        }),
                    });
                    console.log('paymentIntent:', paymentIntent);
                    console.log('customer:', customer);

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
                                client_secret: paymentIntent.client_secret,
                            }),
                        });
                        console.log('result:', result);

                        if (result.client_secret) {
                            await fetchAPI('/(api)/(ride)/create', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    origin_address: userAddress,
                                    origin_latitude: userLatitude,
                                    origin_longitude: userLongitude,
                                    destination_address: destinationAddress,
                                    destination_latitude: destinationLatitude,
                                    destination_longitude: destinationLongitude,
                                    ride_time: rideTime.toFixed(0),
                                    fare_price: parseInt(amount) * 100,
                                    payment_status: 'paid',
                                    driver_id: driverId,
                                    user_id: userId,
                                }),
                            });

                            intentCreationCallback({
                                clientSecret: result.client_secret,
                            });
                        } else {
                            Alert.alert(`Error`, 'Unable to book ride');
                            router.back();
                        }
                    } else {
                        Alert.alert(`Error`, 'Invalid Client Secret');
                        router.back();
                    }
                },
            },
            returnURL: 'myapp://book-ride',
        });
        if (error) {
            console.log('error in initPaymentSheet:', error);
        }
    }

    const openPaymentSheet = useCallback(async () => {
        console.log('openPaymentSheet');
        await initializePaymentSheet();

        const {error} = await presentPaymentSheet();
        console.log('error:', error);

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            setSuccess(true);
        }
    }, []);

    return (
        <>
            {/*<CustomButton title={'Confirm Ride'} className={'my-10'} onPress={openPaymentSheet}/>*/}
            <CustomButton title={'Confirm Ride'} className={'my-10'} onPress={() => setSuccess(true)}/>

            <ReactNativeModal isVisible={success} onBackdropPress={() => setSuccess(false)}>
                <View className={'flex flex-col items-center justify-center bg-white p-7 rounded-2xl'}>
                    <Image source={images.check} className={'w-28 h-28 mt-5'}/>
                    <Text className={'text-2xl text-center font-JakartaBold mt-5'}>Ride Booked!</Text>
                    <Text className={'text-base text-general-200 font-JakartaMedium text-center mt-3'}>
                        Thank you for your booking. Your reservation has been placed. Please process with your trip!
                    </Text>
                    <CustomButton
                        title={'Back Home'}
                        onPress={() => {
                            setSuccess(false);
                            router.push(routes.homePath);
                        }}
                        className={'mt-5'}
                    />
                </View>
            </ReactNativeModal>
        </>
    );
}

export default Payment;
