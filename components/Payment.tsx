import {Text, View} from "react-native";
import CustomButton from "@/components/CustomButton";
import {useCallback} from "react";

function Payment() {
    const openPaymentSheet = useCallback(() => {

    }, []);

    return (
        <>
            <CustomButton title={'Confirm Ride'} className={'my-10'} onPress={openPaymentSheet}/>
            <Text>Payment</Text>
        </>
    );
}

export default Payment;
