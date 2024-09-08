import {Href} from "expo-router";

/*interface Routes {
    welcomePath: Href;
    signInPath: Href;
    signUpPath: Href;
    homePath: Href;
}*/

const routes: Record<string, Href> = {
    welcomePath: '/(auth)/welcome',
    signInPath: '/(auth)/sign-in',
    signUpPath: '/(auth)/sign-up',
    homePath: '/(root)/(tabs)/home',
    findRidePath: '/(root)/find-ride',
    confirmRidePath: '/(root)/confirm-ride',
    bookRidePath: '/(root)/book-ride',
}

export default routes;
