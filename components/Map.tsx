import MapView, {Marker, PROVIDER_DEFAULT} from "react-native-maps";
import {useDriverStore, useLocationStore} from "@/store";
import {useEffect, useState} from "react";
import {calculateDriverTimes, calculateRegion, generateMarkersFromData} from "@/lib/map";
import {Driver, MarkerData} from "@/types/type";
import {icons} from "@/constants";
import {useFetch} from "@/lib/fetch";
import {ActivityIndicator, Text, View} from "react-native";
import MapViewDirections from 'react-native-maps-directions';

function Map() {
    const {data: drivers, loading, error} = useFetch<Driver>('/(api)/driver');
    const {userLatitude, userLongitude, destinationLatitude, destinationLongitude} = useLocationStore();
    const {selectedDriver, setDrivers} = useDriverStore();
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const initialRegion = calculateRegion({
        userLongitude, userLatitude, destinationLatitude, destinationLongitude,
    });

    useEffect(() => {
        if (Array.isArray(drivers)) {
            if (!userLatitude || !userLongitude) return;

            const newMarkers = generateMarkersFromData({
                data: drivers,
                userLatitude,
                userLongitude,
            });

            setMarkers(newMarkers);
        }
    }, [drivers, userLatitude, userLongitude]);

    useEffect(() => {
        if (markers.length > 0 && destinationLatitude && destinationLongitude) {
            calculateDriverTimes({
                markers,
                userLatitude,
                userLongitude,
                destinationLatitude,
                destinationLongitude,
            }).then((drivers) => {
                setDrivers(drivers as MarkerData[]);
            });
        }
    }, [markers, destinationLatitude, destinationLongitude]);

    /** loading */
    if (loading || !userLatitude || !userLongitude) {
        return (
            <View className={'flex justify-between items-center w-full'}>
                <ActivityIndicator color={'#000'} size={'small'}/>
            </View>
        );
    }

    /** error */
    if (error) {
        return (
            <View className={'flex justify-between items-center w-full'}>
                <Text className={'text-red-500 font-Jakarta'}>Error fetching drivers: {error}</Text>
            </View>
        );
    }

    return (
        <MapView provider={PROVIDER_DEFAULT} className={'w-full h-full rounded-2xl'} tintColor={'black'} mapType={'mutedStandard'} showsPointsOfInterest={false} initialRegion={initialRegion}
                 showsUserLocation userInterfaceStyle={'light'}>
            {markers.map((marker) => {
                // console.log('selectedDriver:', selectedDriver);
                // console.log('marker:', marker);
                return (
                    <Marker key={marker.id} coordinate={{latitude: marker.latitude, longitude: marker.longitude}} title={marker.title}
                            image={selectedDriver === marker.id ? icons.selectedMarker : icons.marker}/>
                )
            })}

            {
                (destinationLatitude && destinationLongitude) && (
                    <>
                        <Marker
                            key={'destination'}
                            coordinate={{latitude: destinationLatitude, longitude: destinationLongitude}}
                            title={'Destination'}
                            image={icons.pin}
                        />
                        <MapViewDirections
                            origin={{latitude: userLatitude, longitude: userLongitude}}
                            destination={{latitude: destinationLatitude, longitude: destinationLongitude}}
                            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
                            strokeColor={'#0286FF'}
                            strokeWidth={2}
                        />
                    </>
                )
            }
        </MapView>
    );
}

export default Map;
