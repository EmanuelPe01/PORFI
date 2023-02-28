import { useContext, useReducer } from "react";
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { MapReducer } from "./MapReducer";
import { PlacesContext } from "../";
import { DirectionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState{
    isMapReady: boolean,
    map?: Map;
    markers: Marker[];
}

const INITIAL_STATE : MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
}

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }:Props) => {

    const [state, dispatch] = useReducer (MapReducer, INITIAL_STATE);

    const setMap = ( map: Map ) => {

        new Marker({
            color: '#61DAFB'
        })
        .setLngLat ( map.getCenter() ) //Latitud y longitud del usuario
        .setPopup ( )
        .addTo ( map );


        dispatch({ type: 'setMap', payload: map})
    }

    const getRouteBetweenPoints = async( start: [number, number], end: [number, number] ) =>{

        const resp = await DirectionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`);
        const{ distance, duration, geometry} = resp.data.routes[0];
        const { coordinates: coords } = geometry;
        
        //********** DISTACIA Y TIEMPO *********
        //Se puede mostrar en el State
        let kms = distance/ 1000;
            kms = Math.round(kms*100);
            kms /= 100;

        const minutes = Math.floor(duration/60);
        
        alert("KMS: "+kms+ " MINUTOS: "+minutes + "\nCosto sugerido: $" + (kms*6.70));

        const bounds = new LngLatBounds(
            start,
            start
        );

        for (const coord of coords){
            const newCoord: [ number, number] = [ coord[0], coord[1] ];
            bounds.extend(newCoord);
        }

        state.map?.fitBounds( bounds, {
            padding: 50
        });

        //polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }

        if( state.map?.getLayer('RouteString')){
            state.map.removeLayer('RouteString');
            state.map.removeSource('RouteString');
        }

        state.map?.addSource('RouteString', sourceData);

        state.map?.addLayer({
            id: 'RouteString',
            type:'line',
            source: 'RouteString',
            layout:{
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': '#FFFFFF',
                'line-width': 3
            }
        })
    }

    

    return (
        <MapContext.Provider value = {{
            ...state,
            //Metodos
            setMap,
            getRouteBetweenPoints
        }}>
            { children }
        </MapContext.Provider>
    )
}