import {FlatList, View} from "react-native";
import RideLayout from "@/components/RideLayout";
import DriverCard from "@/components/DriverCard";
import CustomButton from "@/components/CustomButton";
import {useRouter} from "expo-router";
import routes from "@/constants/Routes";
import {useDriverStore} from "@/store";

function ConfirmRideScreen() {
    const router = useRouter();
    const {drivers, selectedDriver, setSelectedDriver} = useDriverStore();

    return (
        <RideLayout title={'Choose a Drive'} snapPoints={['65%', '85%']}>
            <FlatList
                data={drivers}
                renderItem={({item}) => (
                    <DriverCard item={item} selected={selectedDriver!} setSelected={() => setSelectedDriver(Number(item.id))}/>
                )}
                ListFooterComponent={() => (
                    <View className={'mx-5 mt-10'}>
                        <CustomButton title={'Select Ride'} onPress={() => router.push(routes.bookRidePath)} disabled={!selectedDriver} className={`${!selectedDriver && 'bg-gray-300'}`}/>
                    </View>
                )}
            />
        </RideLayout>
    );
}

export default ConfirmRideScreen;
