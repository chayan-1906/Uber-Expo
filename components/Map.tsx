import MapView, {PROVIDER_DEFAULT} from "react-native-maps";

function Map() {
    const initialRegion = {}

    return (
        <MapView provider={PROVIDER_DEFAULT} className={'w-full h-full rounded-2xl'} tintColor={'black'} mapType={'mutedStandard'} showsPointsOfInterest={false} initialRegion={initialRegion}
                 showsUserLocation userInterfaceStyle={'light'}>

        </MapView>
    );
}

export default Map;
