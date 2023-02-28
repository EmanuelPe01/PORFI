
import axios from "axios";


const DirectionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params:{
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token:'pk.eyJ1IjoiYWRoZXJlbnRjbG9jazUxIiwiYSI6ImNsY2Y0c2F2cjA2czAzcW55eGRtdGh6aWwifQ.Ci3TlW7pweq7AbHKbBwqaQ',

    }
})

export default DirectionsApi;