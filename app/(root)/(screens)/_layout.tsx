import {Stack} from 'expo-router';

function ScreensLayout() {
    return (
        <Stack>
            <Stack.Screen name='find-ride' options={{headerShown: false}}/>
            <Stack.Screen name='confirm-ride' options={{headerShown: false}}/>
            <Stack.Screen name='book-ride' options={{headerShown: false}}/>
        </Stack>
    );
}

export default ScreensLayout;
