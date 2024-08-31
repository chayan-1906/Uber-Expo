import {Image, ScrollView, Text, View} from "react-native";
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

function SignUpPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [verification, setVerification] = useState<Verification>({
        state: 'pending',
        error: '',
        code: '',
    });
    const {isLoaded, signUp, setActive} = useSignUp();
    const [isModalOpened, setIsModalOpened] = useState(false);

    const router = useRouter();

    const onSignUpPress = useCallback(async () => {
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                emailAddress: form.email,
                password: form.password,
            });

            await signUp.prepareEmailAddressVerification({strategy: 'email_code'});

            setVerification({...verification, state: 'pending'});
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    }, []);

    const onVerifyPress = useCallback(async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: verification.code,
            });

            if (completeSignUp.status === 'complete') {
                // TODO: Create a database user!
                await setActive({session: completeSignUp.createdSessionId});
                setVerification({...verification, state: 'success'});
                router.replace('/');
            } else {
                console.error(JSON.stringify(completeSignUp, null, 2));
                setVerification({...verification, state: 'failed', error: 'Verification failed'});
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
            setVerification({...verification, state: 'failed', error: err.errors[0].longMessage});
        }
    }, []);

    useEffect(() => {
        if (verification.state === 'success') setIsModalOpened(true);
    }, [verification.state]);

    return (
        <ScrollView className={'flex-1 bg-white'}>
            <View className={'flex-1 bg-white'}>
                {/** header with bg image */}
                <View>
                    <Image source={images.signUpCar} className={'z-0 w-full h-[250px]'}/>
                    <Text className={'text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'}>Create Your Account</Text>
                </View>

                {/** content - input fields */}
                <View className={'p-5'}>
                    <InputField label={'Name'} placeholder={'Enter your name...'} icon={icons.person} value={form.name} onChangeText={(value) => setForm({...form, name: value})}/>
                    <InputField label={'Email Address'} placeholder={'Enter your email address...'} icon={icons.email} value={form.email} onChangeText={(value) => setForm({...form, email: value})}/>
                    <InputField label={'Password'} placeholder={'Enter a password...'} icon={icons.lock} value={form.password} onChangeText={(value) => setForm({...form, password: value})}/>
                    <CustomButton title={'Sign Up'} onPress={onSignUpPress} className={'mt-6'}/>

                    {/** OAuth */}
                    <OAuth/>

                    <Link href={routes.signInPath} className={'text-lg text-center text-general-200 mt-10'}>
                        <Text className={'font-JakartaSemiBold'}>Already have an account? </Text>
                        <Text className={'text-primary-500 font-JakartaSemiBold'}>Sign In</Text>
                    </Link>
                </View>

                {/** verification modal */}
                <ReactNativeModal isVisible={isModalOpened}>
                    <View className={'bg-white px-7 py-9 rounded-2xl min-h-[300px]'}>
                        <Image source={images.check} className={'w-[110px] h-[110px] mx-auto my-5'}/>
                        <Text className={'text-3xl font-JakartaSemiBold text-center'}>Verified</Text>
                        <Text className={'text-base text-gray-400 font-JakartaSemiBold text-center mt-2'}>You have successfully verified your account</Text>
                        <CustomButton
                            title={'Browse Home'}
                            onPress={() => {
                                setIsModalOpened(false);    // close modal before redirecting
                                setTimeout(() => router.replace(routes.homePath), 500); // after 500ms redirect to home
                            }}
                            className={'mt-5'}
                        />
                    </View>
                </ReactNativeModal>
            </View>
        </ScrollView>
    );
}

export default SignUpPage;
