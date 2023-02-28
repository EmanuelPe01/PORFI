import { Feature } from "../../interfaces/places";
import { PlacesState } from "./PlacesProvider";


type PlacesAction = 
| {type: 'serUserLocation', payload:[number,number]}
| {type: 'setLoadingPlaces'}
| {type: 'setPlaces', payload: Feature[]}


export const PlacesReducer = (state: PlacesState, action: PlacesAction ):PlacesState => {

    switch (action.type) {
        case 'serUserLocation':
            return{
                ...state,//se hace una copia del state que muestra como se encuentra
                isLoading: false,
                userLocation: action.payload
            }

        case 'setLoadingPlaces':
            return{
                ...state,
                isLoadingPlaces: true,
                places: [],
            }

        case 'setPlaces':
            return{
                ...state,
                isLoadingPlaces: false,
                places: action.payload,
            }

        default:
            return state;
    }
}