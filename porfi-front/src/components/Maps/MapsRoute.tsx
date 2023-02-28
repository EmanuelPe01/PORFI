import { MapProvider, PlacesProvider } from "./context"
import { HomeInfo } from "./screens/Home_info"
import './styles.css';

export const MapsRoute = () => {
    return (
        <PlacesProvider>
            <MapProvider>
                <HomeInfo/>
            </MapProvider>
        </PlacesProvider>
    )
}