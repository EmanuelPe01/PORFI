//Informacion que almacenamos en memoria

import { useEffect, useReducer } from "react"
import { SearchApi } from "../../apis"
import { getUserLocation } from "../../helpers"
import { PlacesContext } from "./PlacesContext"
import { PlacesReducer } from "./PlacesReducer"

import { Feature, PlacesResponse } from "../../interfaces/places"

export interface PlacesState {
    isLoading: boolean,
    userLocation?: [number, number],
    isLoadingPlaces: boolean;
    places: Feature[];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

export const PlacesProvider = ({children}:Props) => {

    const [state, dispatch] = useReducer(PlacesReducer, INITIAL_STATE);
    
    //Aqui se obtiene la geolocalizacion de la persona
    useEffect(() => {
        getUserLocation()
            .then(lngLat => dispatch({type: 'serUserLocation', payload: lngLat}))
    }, []);

    const SearchPlacesByTerm = async( query: string ): Promise<Feature[]> => {
        if( query.length === 0 ) {
            dispatch({ type: 'setPlaces', payload: []});
            return[];
        }
        if( !state.userLocation ) throw new Error('No hay localización del usuario');

        dispatch({ type: 'setLoadingPlaces'});

        const resp = await SearchApi.get<PlacesResponse>(`/${ query }.json`,{
            params: {
                proximity: state.userLocation.join(',')
            }
        });

        dispatch({ type: 'setPlaces', payload: resp.data.features});
        return resp.data.features;

    }




    return (
        <PlacesContext.Provider value={{
            ...state, //Exparce todo el state
            //Metodos
            SearchPlacesByTerm
        }}>
            {children}
        </PlacesContext.Provider>
    )
}