import React, { useEffect, useState } from 'react'
import { Button, Card, createTheme, Grid, Input, NextUIProvider, Spacer, Text, Textarea } from "@nextui-org/react";
import { NavBarDesign } from '../NavBarDesign';
import { MapsRoute } from '../Maps/MapsRoute';
import Swal from 'sweetalert2'
import mapboxgl from 'mapbox-gl';

import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

const endPoint = "http://127.0.0.1:8000/api/get-mandado-by-id";

//get-mandado-by-id/{id}
const cookie = new Cookies();

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1hbnVlbHBlMDEiLCJhIjoiY2xjcjBwMTdyMGJkNzN2bjR2NXN2dWFsMSJ9.bzrB5OcopwPOdgSXijdmGQ';

if (!navigator.geolocation) {
    alert('No se pudo acceder a tu localizacion');
    throw new Error('No se pudo acceder a tu localizacion');
}

const temaClaro = createTheme({
    type: 'light',
    theme: {
        colors: {
            background: '#FFF',
            text: '#401714',
            colorPrincipal_1: '#e85b51',
            colorPrincipal_2: '#910838'
        },
        space: {},
        fonts: {}
    }
})

export const SeeDetails = () => {
    const [nombre_mandado, setNombreMandado] = useState('')
    const [descripcion, setDescription] = useState('')
    const [direccion, setDireccion] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState ('')
    const [telefono, setTelefono] = useState ('')
    const { id } = useParams()

    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = cookie.get('userToken');
        if (loggedUser) {
            setToken(loggedUser);
        }
        getMandadoById();
    }, [])

    const getMandadoById = async () => {
        const response = await axios.get(`${endPoint}/${id}`)
        setNombreMandado(response.data[0].nombre_mandado)
        setDescription(response.data[0].descripcion)
        setDireccion(response.data[0].ubicacion)
        localStorage.setItem('latDestino', response.data[0].latitud)
        localStorage.setItem('lngDestino', response.data[0].longitud)
        setNombre(response.data[0].name)
        setApellido(response.data[0].last_name)
        setTelefono(response.data[0].phone)
    }

    const renderScreen = () => {
        return (
            <NextUIProvider theme={temaClaro}>
                <NavBarDesign token={token} />
                <Spacer y={1} />
                <Grid.Container gap={3.5} justify="center">
                    <Grid xs={12} lg = {4}>
                        <Card>
                            <Card.Body>
                                <Text
                                    align='center'
                                    h1
                                    size={38}
                                    css={{
                                        textGradient: "45deg, $colorPrincipal_1 -20%, $colorPrincipal_2 100%",
                                    }}
                                    weight="bold"
                                >
                                    Detalles del favor
                                </Text>
                                <Text h3 size={30}>Favor: </Text>
                                <Text size={25} >{nombre_mandado}</Text>
                                <Spacer y={1} />
                                <Text h3 size={30}>Descripcion: </Text>
                                <Text size={25} >{descripcion}</Text>
                                <Spacer y={2} />
                                <Text
                                    align='center'
                                    h1
                                    size={38}
                                    css={{
                                        textGradient: "45deg, $colorPrincipal_1 -20%, $colorPrincipal_2 100%",
                                    }}
                                    weight="bold"
                                > Datos del cliente
                                </Text>
                                <Spacer y={1} />
                                <Text h3 size={30}>Nombre: </Text>
                                <Text size={25} >{nombre} {apellido}</Text>
                                <Spacer y={1} />
                                <Text h3 size={30}>Dirección: </Text>
                                <Text size={25} >{direccion}</Text>
                                <Spacer y={1} />
                                <Text h3 size={30}>Teléfono: </Text>
                                <Text size={25} >{telefono}</Text>
                                <Spacer y={1.5} />
                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid xs={12} lg = {6}>
                        <Card 
                            css = {{
                                paddingBottom: '500px'
                            }}
                        >
                            <React.StrictMode>
                                <MapsRoute />
                            </React.StrictMode>
                        </Card>
                    </Grid>
                </Grid.Container>
            </NextUIProvider >
        );
    }

    return (
        <span>
            {
                token
                    ? renderScreen()
                    : navigate('/')
            }
        </span>

    );
}

export default SeeDetails;