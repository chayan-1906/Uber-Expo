import {Href} from "expo-router";

interface Routes {
    welcomePath: Href;
    signInPath: Href;
    signUpPath: Href;
}

const routes: Record<string, Href> = {
    // homePath: '',
    welcomePath: '/(auth)/welcome',
    signInPath: '/(auth)/sign-in',
    signUpPath: '/(auth)/sign-up',
}

export default routes;
