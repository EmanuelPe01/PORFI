import { ChangeEvent, useContext, useRef } from "react"
import { PlacesContext } from "../context"
import { SearchResults } from ".";


export const SearchBar = () => {

    const {SearchPlacesByTerm} = useContext( PlacesContext );

    const debounceRef = useRef<NodeJS.Timeout>()

    const onQueryChanged = ( event:ChangeEvent<HTMLInputElement> ) =>{
        if ( debounceRef.current )
            clearTimeout( debounceRef.current );

        debounceRef.current = setTimeout(() => {
            //todo: Buscar o ejecutar consulta
            SearchPlacesByTerm( event.target.value );
        }, 350);
    }

    return(
        <div className="search-container">
            <input type="text" 
            className="form-control"
            placeholder="Buscar lugar..."
            onChange={ onQueryChanged }
            />
            <SearchResults/>
        </div>
    )
}