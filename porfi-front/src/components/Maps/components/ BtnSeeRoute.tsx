import { useContext } from "react"
import { MapContext, PlacesContext } from "../context"



export const BtnSeeRoute = ( ) => {

    const { map, isMapReady, getRouteBetweenPoints} = useContext ( MapContext );
        const { userLocation } = useContext ( PlacesContext );
    
    const onClick = () => {
        if (!userLocation) return;

        const lat = localStorage.getItem('latDestino');
        const lng = localStorage.getItem('lngDestino');

        if(lat && lng){
            getRouteBetweenPoints(userLocation, [parseFloat(lat), parseFloat(lng)]);
        }

        map?.flyTo({
            zoom: 15,
            center: userLocation
        })
    }

    return (
        <button className="btn btn-primary"
        onClick={ onClick }
        style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 999
        }}
        >
            Ver trayectoria
        </button>
    )
}