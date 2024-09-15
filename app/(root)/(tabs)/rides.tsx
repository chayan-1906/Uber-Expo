import {SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator, FlatList, Image, Text, View} from "react-native";
import RideCard from "@/components/RideCard";
import {images} from "@/constants";
import {useUser} from "@clerk/clerk-expo";
import {useFetch} from "@/lib/fetch";
import {Ride} from "@/types/type";

function RidesPage() {
    const {user} = useUser();
    const {data: recentRides, loading} = useFetch<Ride[]>(`/(api)/(ride)/${user?.id}`);

    return (
        <SafeAreaView>
            <FlatList
                data={recentRides}
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
                                    <Text className={'text-sm font-Jakarta'}>No recent rides found</Text>
                                </>
                            ) : (
                                <ActivityIndicator size={'small'} color={'#000'}/>
                            )
                        }
                    </View>
                )}
                ListHeaderComponent={() => (
                    <Text className={'text-2xl font-JakartaBold mt-3 mb-5'}>All Rides</Text>
                )}
            />
        </SafeAreaView>
    );
}

export default RidesPage;
