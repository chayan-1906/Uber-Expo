import {Ride} from "@/types/type";
import {Image, Text, View} from "react-native";
import {icons} from "@/constants";
import {formatDate, formatTime} from "@/lib/utils";

function RideCard({ride}: { ride: Ride }) {
    const {
        ride_id,
        origin_address,
        destination_address,
        origin_latitude,
        origin_longitude,
        destination_latitude,
        destination_longitude,
        ride_time,
        fare_price,
        payment_status,
        user_id,
        created_at,
        driver,
    } = ride || {};
    const {driver_id, first_name, last_name, profile_image_url, car_image_url, car_seats, rating} = driver || {};

    return (
        <View className={'flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3'}>
            <View className={'flex flex-col items-center justify-center p-3'}>
                <View className={'flex flex-row items-center justify-between'}>
                    <Image
                        source={{uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`}}
                        className={'w-[80px] h-[90px] rounded-lg'}/>

                    <View className={'flex flex-col flex-1 mx-5 gap-y-5'}>
                        <View className={'flex flex-row items-center gap-x-2'}>
                            <Image source={icons.to} className={'w-5 h-5'}/>
                            <Text className={'text-base font-JakartaMedium'} numberOfLines={1}>{origin_address}</Text>
                        </View>

                        <View className={'flex flex-row items-center gap-x-2'}>
                            <Image source={icons.point} className={'w-5 h-5'}/>
                            <Text className={'text-base font-JakartaMedium'} numberOfLines={1}>{destination_address}</Text>
                        </View>
                    </View>
                </View>

                <View className={'flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center'}>
                    {/** date time */}
                    <View className={'flex flex-row w-full items-center justify-between mb-5'}>
                        <Text className={'text-base font-JakartaMedium text-gray-500'}>Date & Time</Text>
                        <Text className={'text-base font-JakartaMedium text-gray-500'}>{formatDate(created_at)}, {formatTime(ride_time)}</Text>
                    </View>

                    {/** driver */}
                    <View className={'flex flex-row w-full items-center justify-between mb-5'}>
                        <Text className={'text-base font-JakartaMedium text-gray-500'}>Driver</Text>
                        <Text className={'text-base font-JakartaMedium text-gray-500'}>{first_name} {last_name}</Text>
                    </View>

                    {/** car seats */}
                    <View className={'flex flex-row w-full items-center justify-between mb-5'}>
                        <Text className={'text-base font-JakartaMedium text-gray-500'}>Car Seats</Text>
                        <Text className={'text-base font-JakartaMedium text-gray-500'}>{car_seats}</Text>
                    </View>

                    {/** payment status */}
                    <View className={'flex flex-row w-full items-center justify-between mb-5'}>
                        <Text className={'text-base font-JakartaMedium text-gray-500'}>Payment Status</Text>
                        <Text className={`text-base font-JakartaMedium capitalize ${payment_status === 'paid' ? 'text-green-500' : 'text-red-500'}`}>{payment_status}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default RideCard;
