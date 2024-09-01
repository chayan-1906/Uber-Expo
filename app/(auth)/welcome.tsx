import {SafeAreaView} from "react-native-safe-area-context";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import routes from "@/constants/Routes";
import Swiper from 'react-native-swiper';
import {useRef, useState} from "react";
import {onboarding} from "@/constants";
import CustomButton from "@/components/CustomButton";

function OnboardingPage() {
    let router = useRouter();
    const swiperRef = useRef<Swiper>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === onboarding.length - 1;

    return (
        <SafeAreaView className={'flex h-full items-center justify-between bg-white'}>
            <TouchableOpacity className={'flex w-full justify-end items-end p-5'} onPress={() => router.replace(routes.signInPath)}>
                <Text className={'text-black text-base font-JakartaBold'}>Skip</Text>
            </TouchableOpacity>

            <Swiper ref={swiperRef} loop={false} dot={<View className={'w-[32px] h-[4px] mx-1 bg-[#E2E8F0]'}/>} activeDot={<View className={'w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full'}/>}
                    onIndexChanged={(index) => setActiveIndex(index)}>
                {
                    onboarding.map(({id, title, description, image}) => (
                        <View key={id}>
                            <Image source={image} resizeMode={'contain'} className={'w-full h-[300px]'}/>
                            <View className={'flex flex-row items-center justify-center w-full mt-10'}>
                                <Text className={'text-black text-3xl font-JakartaBold mx-10 text-center'}>{title}</Text>
                            </View>
                            <Text className={'text-base font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3'}>{description}</Text>
                        </View>
                    ))
                }
            </Swiper>

            <CustomButton title={isLastSlide ? 'Get Started' : 'Next'} className={'w-11/12 mt-10'} onPress={() => isLastSlide ? router.replace(routes.signUpPath) : swiperRef.current?.scrollBy(1)}/>
        </SafeAreaView>
    );
}

export default OnboardingPage;
