import {Alert, Image, Text, View} from "react-native";
import CustomButton from "@/components/CustomButton";
import {icons} from "@/constants";
import {useCallback} from "react";
import {useOAuth} from "@clerk/clerk-expo";
import {googleOAuth} from "@/lib/auth";
import {useRouter} from "expo-router";
import routes from "@/constants/Routes";

function OAuth() {
    const {startOAuthFlow} = useOAuth({strategy: 'oauth_google'});
    const router = useRouter();

    const handleGoogleSignIn = useCallback(async () => {
        try {
            const result = await googleOAuth(startOAuthFlow);
            console.log('googleSignIn result:', result);
            if (result.code === 'session_exists' || result.code === 'success') {
                // Alert.alert('Success', 'Session Exists. Redirecting to home page');
                router.push(routes.homePath);
            }
            Alert.alert(result.success ? 'success' : 'Error', result.message);
        } catch (err) {
            console.log('OAuth Error:', err);
        }
    }, []);

    return (
        <View>
            {/** divider / separator */}
            <View className={'flex flex-row justify-center items-center mt-4 gap-x-3'}>
                <View className={'flex-1 h-[1px] bg-general-100'}/>
                <Text className={'text-lg font-JakartaSemiBold text-general-800'}>Or</Text>
                <View className={'flex-1 h-[1px] bg-general-100'}/>
            </View>

            <CustomButton title={'Sign in with Google'} className={'mt-5 w-full shadow-none'} IconLeft={() => <Image source={icons.google} resizeMode={'contain'} className={'w-5 h-5 mx-2'}/>}
                          bgVariant={'outline'} textVariant={'primary'} onPress={handleGoogleSignIn}/>
        </View>
    );
}

export default OAuth;
