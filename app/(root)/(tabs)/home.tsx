import {Text, View} from "react-native";
import {SignedIn, SignedOut, useUser} from "@clerk/clerk-expo";
import {Link} from "expo-router";
import routes from "@/constants/Routes";
import {SafeAreaView} from "react-native-safe-area-context";

function HomePage() {
    const {user} = useUser();

    return (
        <SafeAreaView>
            <SignedIn>
                <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
            </SignedIn>
            <SignedOut>
                <Link href={routes.signInPath}>
                    <Text>Sign In</Text>
                </Link>
                <Link href={routes.signUpPath}>
                    <Text>Sign Up</Text>
                </Link>
            </SignedOut>
        </SafeAreaView>
    );
}

export default HomePage;
