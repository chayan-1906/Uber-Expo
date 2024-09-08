import MapView, {Marker, PROVIDER_DEFAULT} from "react-native-maps";
import {useDriverStore, useLocationStore} from "@/store";
import {useEffect, useState} from "react";
import {calculateRegion, generateMarkersFromData} from "@/lib/map";
import {MarkerData} from "@/types/type";
import {icons} from "@/constants";
import drivers from "@/data/drivers";

function Map() {
    const {userLatitude, userLongitude, destinationLatitude, destinationLongitude} = useLocationStore();
    const {selectedDriver, setDrivers} = useDriverStore();
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const initialRegion = calculateRegion({
        userLongitude, userLatitude, destinationLatitude, destinationLongitude,
    });

    useEffect(() => {
        setDrivers(drivers);

        if (Array.isArray(drivers)) {
            if (!userLatitude || !userLongitude) return;

            const newMarkers = generateMarkersFromData({
                data: drivers,
                userLatitude,
                userLongitude,
            });

            setMarkers(newMarkers);
        }
    }, [drivers]);

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
        </MapView>
    );
}

export default Map;
