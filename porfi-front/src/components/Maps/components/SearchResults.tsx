import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../context"
import { LoadingPlaces } from ".";
import { Feature } from "../interfaces/places";

export const SearchResults = () => {

    const { places, isLoadingPlaces, userLocation } = useContext ( PlacesContext )
    const { map, getRouteBetweenPoints } = useContext(MapContext);
    const [activeId, setActiveId] = useState('');

    const onPlaceClicked = ( place:Feature ) =>{
        const [ lat, lng ] = place.center;
        setActiveId( place.id );
        map?.flyTo({
            zoom: 13,
            center: [ lat, lng ],
        })
    } 

    if( isLoadingPlaces ){
        return <LoadingPlaces/>
    }

    if ( places.length === 0 ){
        return <></>;
    }

    return(
        <ul className="list-group mt-3">

            {
                places.map( place => (
                    <li key={place.id} className={`list-group-item list-group-item-action pointer ${ (activeId === place.id) ? 'active': '' }`}
                        onClick={ () => onPlaceClicked( place ) }
                    >
                        <h6>{ place.text_es }</h6>
                        <p
                            style={{
                                fontSize: '12px'
                            }}
                        >
                            { place.place_name }
                        </p>

                        <button onClick={() => {
                            const[lat, lng] = place.center;
                            localStorage.setItem('dirDestino', place.place_name);
                            localStorage.setItem('lngDestino', lng.toString());
                            localStorage.setItem('latDestino', lat.toString());
                            window.location.reload();
                        }} className={`btn btn-sm ${ activeId === place.id ? 'btn-outline-light': 'btn-outline-primary'}`}>
                            Guardar
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}