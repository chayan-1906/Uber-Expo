import routes from "@/constants/Routes";
import {Redirect} from "expo-router";
import {useAuth} from "@clerk/clerk-expo";

function Home() {
    const {isSignedIn} = useAuth();

    if (isSignedIn) {
        return <Redirect href={routes.homePath}/>
    }

    return (
        <Redirect href={routes.welcomePath}/>
    );
}

export default Home;
