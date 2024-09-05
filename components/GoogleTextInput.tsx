import {View} from "react-native";
import {GoogleInputProps} from "@/types/type";

function GoogleTextInput({icon, initialLocation, containerStyle, textInputBackgroundColor, handlePress}: GoogleInputProps) {
    return (
        <View className={`flex flex-row justify-center items-center relative z-50 rounded-xl ${containerStyle} mb-5`}>

        </View>
    );
}

export default GoogleTextInput;
