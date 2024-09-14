import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {icons} from '@/constants';
import {formatTime} from '@/lib/utils';
import {DriverCardProps} from '@/types/type';

const DriverCard = ({item, selected, setSelected}: DriverCardProps) => {
    const {id, first_name, last_name, profile_image_url, car_image_url, car_seats, rating, title, price, time} = item;

    return (
        <TouchableOpacity onPress={setSelected} className={`${selected === Number(id) ? 'bg-general-600' : 'bg-white'} flex flex-row items-center justify-between py-5 px-3 rounded-xl`}>
            <Image source={{uri: profile_image_url}} className={'w-14 h-14 rounded-full'}/>

            <View className={'flex-1 flex flex-col items-start justify-center mx-3'}>
                <View className={'flex flex-row items-center justify-start mb-1'}>
                    <Text className={'text-lg font-JakartaRegular'}>{first_name} {last_name}</Text>

                    <View className={'flex flex-row items-center space-x-1 ml-2'}>
                        <Image source={icons.star} className={'w-3.5 h-3.5'}/>
                        <Text className={'text-sm font-JakartaRegular'}>4</Text>
                    </View>
                </View>

                <View className={'flex flex-row items-center justify-start'}>
                    <View className={'flex flex-row items-center'}>
                        <Image source={icons.dollar} className={'w-4 h-4'}/>
                        <Text className={'text-sm font-JakartaRegular ml-1'}>${price}</Text>
                    </View>

                    <Text className={'text-sm font-JakartaRegular text-general-800 mx-1'}>|</Text>

                    <Text className={'text-sm font-JakartaRegular text-general-800'}>{formatTime(time!)}</Text>

                    <Text className={'text-sm font-JakartaRegular text-general-800 mx-1'}>|</Text>

                    <Text className={'text-sm font-JakartaRegular text-general-800'}>{car_seats} seats</Text>
                </View>
            </View>

            <Image source={{uri: car_image_url}} className={'h-14 w-14'} resizeMode={'contain'}/>
        </TouchableOpacity>
    );
};

export default DriverCard;