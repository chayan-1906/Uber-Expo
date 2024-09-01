import {Alert, Image, Text, View} from "react-native";
import {icons, images} from "@/constants";
import InputField from "@/components/InputField";
import {useCallback, useEffect, useState} from "react";
import CustomButton from "@/components/CustomButton";
import {Link, useRouter} from "expo-router";
import routes from "@/constants/Routes";
import OAuth from "@/components/OAuth";
import {useSignUp} from "@clerk/clerk-expo";
import {Verification} from "@/types/type";
import {ReactNativeModal} from "react-native-modal";
import KeyboardAvoidingScrollView from "@/components/KeyboardAvoidingScrollView";

function SignUpPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [verification, setVerification] = useState<Verification>({
        state: 'default',
        error: '',
        code: '',
    });
    const {isLoaded, signUp, setActive} = useSignUp();
    const [isPendingModalOpened, setIsPendingModalOpened] = useState(false);
    const [isSuccessModalOpened, setIsSuccessModalOpened] = useState(false);
    const router = useRouter();

    const onSignUpPress = useCallback(async () => {
        if (!isLoaded) {
            return;
        }
        console.log(form);

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });

            await signUp.prepareEmailAddressVerification({strategy: 'email_code'});

            setVerification({...verification, state: 'pending'});
        } catch (err: any) {
            // console.error(JSON.stringify(err, null, 2));
            Alert.alert('Error', err.errors[0].longMessage);
        }
    }, [form]);

    const onVerifyPress = useCallback(async () => {
        if (!isLoaded) {
            return;
        }
        console.log(verification);

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });

            if (completeSignUp.status === 'complete') {
                // TODO: Create a database user!
                await setActive({session: completeSignUp.createdSessionId});
                setVerification({...verification, state: 'success'});
                // setTimeout(() => router.replace('/'), 500);
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                setVerification({...verification, state: 'failed', error: 'Verification failed'});
            }
        } catch (err: any) {
            // console.error(JSON.stringify(err, null, 2));
            Alert.alert('Error', err.errors[0].longMessage);
            setVerification({...verification, state: 'failed', error: err.errors[0].longMessage});
        }
    }, [verification]);

    useEffect(() => {
        console.log('verification:', verification);
        if (verification.state === 'pending') {
            setIsSuccessModalOpened(false);
            setTimeout(() => setIsPendingModalOpened(true), 500);
        } else if (verification.state === 'success') {
            setIsPendingModalOpened(false);
            setTimeout(() => setIsSuccessModalOpened(true), 500);
        }
    }, [verification.state]);

    return (
        <KeyboardAvoidingScrollView classes={'flex-1'} bounces={false} showsVerticalScrollIndicator={false}>
            <View className={'flex-1 bg-white'}>
                {/** header with bg image */}
                <View>
                    <Image source={images.signUpCar} className={'z-0 w-full h-[250px]'}/>
                    <Text className={'text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'}>Create Your Account</Text>
                </View>

                {/** content - input fields */}
                <View className={'p-5'}>
                    <InputField label={'Name'} placeholder={'Enter your name...'} autoFocus icon={icons.person} value={form.name} onChangeText={(value) => setForm({...form, name: value})}/>
                    <InputField label={'Email Address'} placeholder={'Enter your email address...'} keyboardType={'email-address'} inputMode={'email'} icon={icons.email} value={form.email}
                                onChangeText={(value) => setForm({...form, email: value})}/>
                    <InputField label={'Password'} placeholder={'Enter a password...'} icon={icons.lock} keyboardType={'visible-password'} value={form.password}
                                onChangeText={(value) => setForm({...form, password: value})}/>
                    <CustomButton title={'Sign Up'} onPress={onSignUpPress} className={'mt-6'}/>

                    {/** OAuth */}
                    <OAuth/>

                    <Link href={routes.signInPath} className={'text-lg text-center text-general-200 mt-10'}>
                        <Text className={'font-JakartaSemiBold'}>Already have an account? </Text>
                        <Text className={'text-primary-500 font-JakartaSemiBold'}>Sign In</Text>
                    </Link>
                </View>

                {/** pending verification modal */}
                <ReactNativeModal isVisible={isPendingModalOpened} onModalHide={() => setVerification({...verification, state: 'success'})}>
                    <View className={'bg-white px-7 py-9 rounded-2xl min-h-[300px]'}>
                        <Text className={'text-2xl font-JakartaExtraBold mb-2'}>Verification</Text>
                        <Text className={'font-Jakarta mb-5'}>We've sent a verification code to {form.email}</Text>
                        <InputField label={'Code'} autoFocus icon={icons.lock} placeholder={'12345'} value={verification.code} keyboardType={'numeric'}
                                    onChangeText={(code) => setVerification({...verification, code})}/>
                        {
                            verification.error && (
                                <Text className={'text-red-500 text-sm mt-1'}>{verification.error}</Text>
                            )
                        }
                        <CustomButton title={'Verify Email'} onPress={onVerifyPress} className={'mt-5 bg-success-500'}/>
                    </View>
                </ReactNativeModal>

                {/** success verification modal */}
                <ReactNativeModal isVisible={isSuccessModalOpened}>
                    <View className={'bg-white px-7 py-9 rounded-2xl min-h-[300px]'}>
                        <Image source={images.check} className={'w-[110px] h-[110px] mx-auto my-5'}/>
                        <Text className={'text-3xl font-JakartaSemiBold text-center'}>Verified</Text>
                        <Text className={'text-base text-gray-400 font-JakartaSemiBold text-center mt-2'}>You have successfully verified your account</Text>
                        <CustomButton
                            title={'Browse Home'}
                            onPress={() => {
                                setIsSuccessModalOpened(false);    // close modal before redirecting
                                setTimeout(() => router.replace(routes.homePath), 500); // after 500ms redirect to home
                            }}
                            className={'mt-5'}
                        />
                    </View>
                </ReactNativeModal>
            </View>
        </KeyboardAvoidingScrollView>
    );
}

export default SignUpPage;
