import {Image, View} from "react-native";
import {GoogleInputProps} from "@/types/type";
import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
import {icons} from "@/constants";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

function GoogleTextInput({icon, initialLocation, containerStyle, textInputBackgroundColor, handlePress}: GoogleInputProps) {
    return (
        <View className={`flex flex-row justify-center items-center relative z-50 rounded-xl ${containerStyle} mb-5`}>
            <GooglePlacesAutocomplete
                fetchDetails
                placeholder={'Where do you want to go?'}
                debounce={200}
                styles={{
                    textInputContainer: {
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 20,
                        marginHorizontal: 20,
                        position: 'relative',
                        shadowColor: '#D4D4D4',
                    },
                    textInput: {
                        backgroundColor: textInputBackgroundColor || 'white',
                        fontSize: 16,
                        fontWeight: 600,
                        marginTop: 5,
                        width: '100%',
                        borderRadius: 200,
                    },
                    listView: {
                        backgroundColor: textInputBackgroundColor || 'white',
                        position: 'relative',
                        top: 0,
                        width: '100%',
                        borderRadius: 10,
                        shadowColor: '#D4D4D4',
                        zIndex: 99,
                    },
                }}
                onPress={(data, details = null) => {
                    // console.log('geometry:', details?.geometry);
                    handlePress({
                        latitude: details?.geometry.location.lat!,
                        longitude: details?.geometry.location.lng!,
                        address: data.description,
                    });
                }}
                query={{key: googlePlacesApiKey, language: 'en'}}
                renderLeftButton={() => (
                    <View className={'w-6 h-6'}>
                        <Image source={icon ? icon : icons.search} className={'w-6 h-6'} resizeMode={'contain'}/>
                    </View>
                )}
                textInputProps={{
                    placeholderTextColor: 'gray',
                    placeholder: initialLocation ?? 'Where do you want to go?'
                }}
            />
        </View>
    );
}

export default GoogleTextInput;
