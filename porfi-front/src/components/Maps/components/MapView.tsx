import {useContext, useLayoutEffect, useRef} from 'react';
import { MapContext, PlacesContext } from '../context';
import { Loading } from './Loading';
import { Map } from 'mapbox-gl';

export const MapView = () => {

    const {isLoading,userLocation, places} = useContext(PlacesContext);
    const {setMap} = useContext( MapContext );
    

    const mapDiv = useRef<HTMLDivElement>(null);

    useLayoutEffect (() => {
        if( !isLoading ){
            
            const map = new Map({
                container: mapDiv.current!, // container ID
                style: 'mapbox://styles/mapbox/dark-v10', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 12, // starting zoom
                });
                setMap ( map );
        }
    }, [isLoading])


    if (isLoading){
        return(<Loading/>)
    }

    return(
        <div ref = { mapDiv }
            style={{
                height: '100%',
                width: '100%',
                position: 'absolute'
            }}
        >
        </div>
    )
}