
import axios from "axios";


const SearchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params:{
        limit: 5,
        language: 'es',
        access_token:'pk.eyJ1IjoiYWRoZXJlbnRjbG9jazUxIiwiYSI6ImNsY2Y0c2F2cjA2czAzcW55eGRtdGh6aWwifQ.Ci3TlW7pweq7AbHKbBwqaQ'

    }
})

export default SearchApi;