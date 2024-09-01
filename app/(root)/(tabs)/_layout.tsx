import {SafeAreaView} from "react-native-safe-area-context";
import {Text} from "react-native";

function TabsLayout() {
    return (
        <SafeAreaView className={'flex-1 bg-red-100 justify-center items-center'}>
            <Text className={'font-JakartaBold text-6xl'}>Tabs</Text>
        </SafeAreaView>
    );
}

export default TabsLayout;
