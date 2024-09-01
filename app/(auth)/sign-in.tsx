import {Alert, Image, ScrollView, Text, View} from "react-native";
import {useCallback, useState} from "react";
import {icons, images} from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import {Link, useRouter} from "expo-router";
import routes from "@/constants/Routes";
import {useSignIn} from "@clerk/clerk-expo";

function SignInPage() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const {signIn, setActive, isLoaded} = useSignIn();
    const router = useRouter();

    const onSignInPress = useCallback(async () => {
        if (!isLoaded) {
            return;
        }
        console.log(form);

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({session: signInAttempt.createdSessionId});
                setTimeout(() => router.replace(routes.homePath), 500);
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err: any) {
            // console.error(JSON.stringify(err, null, 2));
            Alert.alert('Error', err.errors[0].longMessage);
        }
    }, [form]);

    return (
        <ScrollView className={'flex-1 bg-white'} bounces={false} showsVerticalScrollIndicator={false}>
            <View className={'flex-1 bg-white'}>
                <View>
                    <Image source={images.signUpCar} className={'z-0 w-full h-[250px]'}/>
                    <Text className={'text-3xl text-black font-JakartaBold absolute bottom-5 left-5'}>Welcome 👋</Text>
                </View>
                <View className={'p-5'}>
                    <InputField label={'Email Address'} placeholder={'Enter your email address...'} autoFocus icon={icons.email} value={form.email} onChangeText={(value) => setForm({...form, email: value})}/>
                    <InputField label={'Password'} placeholder={'Enter a password...'} icon={icons.lock} value={form.password} onChangeText={(value) => setForm({...form, password: value})}/>
                    <CustomButton title={'Sign In'} onPress={onSignInPress} className={'mt-6'}/>

                    {/** OAuth */}
                    <OAuth/>

                    <Link href={routes.signUpPath} className={'text-lg text-center text-general-200 mt-10'}>
                        <Text className={'font-JakartaSemiBold'}>Don't have an account? </Text>
                        <Text className={'text-primary-500 font-JakartaSemiBold'}>Sign Up</Text>
                    </Link>
                </View>

                {/** verification modal */}
            </View>
        </ScrollView>
    );
}

export default SignInPage;
