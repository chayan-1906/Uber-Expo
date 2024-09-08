import {Keyboard, Text, View} from "react-native";
import {useLocationStore} from "@/store";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import {icons} from "@/constants";
import CustomButton from "@/components/CustomButton";
import routes from "@/constants/Routes";
import {useRouter} from "expo-router";
import {useEffect, useState} from "react";

function FindRideScreen() {
    const {userAddress, destinationAddress, setDestinationLocation, setUserLocation} = useLocationStore();
    const router = useRouter();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [snapPoints, setSnapPoints] = useState(['40%', '85%']);

    /** set snapPoints to 85% if keyboard is opened */
    useEffect(() => {
        if (isKeyboardVisible) setSnapPoints(['85%']);
        else setSnapPoints(['40%', '85%']);
    }, [isKeyboardVisible]);

    /** detect whether keyboard is opened or not */
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <RideLayout title={'Ride'} snapPoints={snapPoints}>
            {/** from */}
            <View className={'my-3'}>
                <Text className={'text-lg font-JakartaSemiBold mb-3'}>From</Text>
                <GoogleTextInput
                    icon={icons.target}
                    initialLocation={userAddress!}
                    containerStyle={'bg-neutral-100'}
                    textInputBackgroundColor={'#F5F5F5'}
                    handlePress={(location) => setUserLocation(location)}
                />
            </View>

            {/** to */}
            <View className={'my-3'}>
                <Text className={'text-lg font-JakartaSemiBold mb-3'}>To</Text>
                <GoogleTextInput
                    icon={icons.target}
                    initialLocation={destinationAddress!}
                    containerStyle={'bg-neutral-100'}
                    textInputBackgroundColor={'transparent'}
                    handlePress={(location) => setDestinationLocation(location)}
                />
            </View>

            <CustomButton title={'Find now'} onPress={() => router.push(routes.confirmRidePath)} className={'mt-5'}/>
        </RideLayout>
    );
}

export default FindRideScreen;
