import {KeyboardAvoidingView, Platform, ScrollView, View} from "react-native";
import {KeyboardAvoidingScrollViewProps} from "@/types/type";

function KeyboardAvoidingScrollView({children, classes, ...props}: KeyboardAvoidingScrollViewProps) {
    return (
        <KeyboardAvoidingView className={'flex flex-1 bg-primary'} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView {...props}>
                <View className={`mb-4 ${classes}`}>
                    {children}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default KeyboardAvoidingScrollView;
