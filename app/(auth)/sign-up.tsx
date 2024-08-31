import {Image, ScrollView, Text, View} from "react-native";
import {icons, images} from "@/constants";
import InputField from "@/components/InputField";
import {useCallback, useState} from "react";
import CustomButton from "@/components/CustomButton";
import {Link} from "expo-router";
import routes from "@/constants/Routes";
import OAuth from "@/components/OAuth";

function SignUpPage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const onSignUpPress = useCallback(() => {

    }, []);

    return (
        <ScrollView className={'flex-1 bg-white'}>
            <View className={'flex-1 bg-white'}>
                <View>
                    <Image source={images.signUpCar} className={'z-0 w-full h-[250px]'}/>
                    <Text className={'text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'}>Create Your Account</Text>
                </View>
                <View className={'p-5'}>
                    <InputField label={'Name'} placeholder={'Enter your name...'} icon={icons.person} value={form.name} onChangeText={(value) => setForm({...form, name: value})}/>
                    <InputField label={'Email Address'} placeholder={'Enter your email address...'} icon={icons.email} value={form.email} onChangeText={(value) => setForm({...form, email: value})}/>
                    <InputField label={'Password'} placeholder={'Enter a password...'} icon={icons.lock} value={form.password} onChangeText={(value) => setForm({...form, password: value})}/>
                    <CustomButton title={'Sign Up'} onPress={onSignUpPress} className={'mt-6'}/>

                    {/** OAuth */}
                    <OAuth/>

                    <Link href={routes.signInPath} className={'text-lg text-center text-general-200 mt-10'}>
                        <Text>Already have an account? </Text>
                        <Text className={'text-primary-500'}>Sign In</Text>
                    </Link>
                </View>

                {/** verification modal */}
            </View>
        </ScrollView>
    );
}

export default SignUpPage;
