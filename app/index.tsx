import routes from "@/constants/Routes";
import {Href, Redirect} from "expo-router";

function Home() {
    return (
        <Redirect href={routes.welcomePath as Href}/>
    );
}

export default Home;
