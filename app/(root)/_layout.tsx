import {Stack} from 'expo-router';

function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name='(tabs)' options={{headerShown: false}}/>
        </Stack>
    );
}

export default RootLayout;
