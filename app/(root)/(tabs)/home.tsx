import {useUser} from "@clerk/clerk-expo";
import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import RideCard from "@/components/RideCard";
import {icons, images} from "@/constants";
import {useCallback, useEffect, useState} from "react";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import {useLocationStore} from "@/store";
import * as Location from 'expo-location';
import {useRouter} from "expo-router";
import routes from "@/constants/Routes";
import recentRides from "@/data/recentRides";

function HomePage() {
    const {setUserLocation, setDestinationLocation} = useLocationStore();
    const {user} = useUser();
    const {firstName, emailAddresses} = user || {};
    const loading = true;
    const router = useRouter();

    const [hasPermissions, setHasPermissions] = useState(false);

    const handleSignOut = useCallback(() => {

    }, []);

    const handleDestinationPress = useCallback((location: { latitude: number, longitude: number, address: string }) => {
        setDestinationLocation(location);
        router.push(routes.findRidePath);
    }, []);

    useEffect(() => {
        const requestLocation = async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setHasPermissions(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync();
            const address = await Location.reverseGeocodeAsync({
                latitude: location.coords?.latitude,
                longitude: location.coords?.longitude,
            });

            setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                address: `${address[0].name}, ${address[0].region}`,
            });
        }

        requestLocation();
    }, []);

    return (
        <SafeAreaView className={'bg-general-500'}>
            <Text>EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: {process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}</Text>
            <FlatList
                data={recentRides?.slice(0, 5)}
                // data={[]}
                contentContainerStyle={{paddingBottom: 60}}
                className={'px-5'}
                keyboardShouldPersistTaps={'handled'}
                renderItem={({item}) => {
                    return (
                        <RideCard ride={item}/>
                    );
                }}
                ListEmptyComponent={() => (
                    <View className={'flex flex-col items-center justify-center'}>
                        {
                            !loading ? (
                                <>
                                    <Image source={images.noResult} alt={'No recent rides found'} resizeMode={'contain'} className={'w-40 h-40'}/>
                                    <Text className={'text-sm'}>No recent rides found</Text>
                                </>
                            ) : (
                                <ActivityIndicator size={'small'} color={'#000'}/>
                            )
                        }
                    </View>
                )}
                ListHeaderComponent={() => (
                    <>
                        <View className={'flex flex-row items-center justify-between my-5'}>
                            <Text className={'w-10/12 text-2xl capitalize font-JakartaExtraBold'}>Welcome, {firstName || emailAddresses[0].emailAddress.split('@')[0]} 👋🏻</Text>
                            <TouchableOpacity onPress={handleSignOut} className={'h-10 w-10 justify-center items-center rounded-full bg-white'}>
                                <Image source={icons.out} className={'w-4 h-4'}/>
                            </TouchableOpacity>
                        </View>

                        {/** google text input */}
                        <GoogleTextInput icon={icons.search} containerStyle={'bg-white shadow-md shadow-neutral-300'} handlePress={handleDestinationPress}/>

                        <>
                            <Text className={'text-xl font-JakartaBold mt-5 mb-3'}>Your Current Location</Text>
                            <View className={'flex flex-row h-[300px] items-center bg-transparent'}>
                                <Map/>
                            </View>
                        </>

                        <Text className={'text-xl font-JakartaBold mt-5 mb-3'}>Recent Rides</Text>
                    </>
                )}
            />
        </SafeAreaView>
    );
}

export default HomePage;
