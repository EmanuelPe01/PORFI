import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, createTheme, Grid, Input, NextUIProvider, Spacer, Text, Textarea } from "@nextui-org/react";
import { NavBarDesign } from '../NavBarDesign';
import { MapsApp } from '../Maps/MapsApp';
import Swal from 'sweetalert2'
import mapboxgl from 'mapbox-gl';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

////const endPoint = "http://192.168.100.34:8000/api/";
const endPoint = "http://127.0.0.1:8000/api";
const cookie = new Cookies();

mapboxgl.accessToken = 'pk.eyJ1IjoiZW1hbnVlbHBlMDEiLCJhIjoiY2xjcjBwMTdyMGJkNzN2bjR2NXN2dWFsMSJ9.bzrB5OcopwPOdgSXijdmGQ';

if (!navigator.geolocation) {
    alert('No se pudo acceder a tu localizacion');
    throw new Error('No se pudo acceder a tu localizacion');
}

function OkAlert() {
    Swal.fire({
        title: '¡Todo correcto!',
        icon: 'success',
        timer: 1600
    })
}

function ErrorAlert() {
    Swal.fire({
        title: '¡Error!',
        text: 'Rellena todos los campos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    })
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


export const PedirFavor = () => {
    //Datos a mandar 
    const [nombreMandado, setNombreMandado] = useState(localStorage.getItem('nombreMandado'));
    const [descripcion, setDescripcion] = useState(localStorage.getItem('descripcion'));
    
    const [direccion, setDireccion] = useState(localStorage.getItem('dirDestino'));

    //Necesario para verificar si el usuario está logueado
    const [token, setToken] = useState('');
    const userData = JSON.parse(localStorage.getItem('userProfile'));
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = cookie.get('userToken');
        if (loggedUser) {
            setToken(loggedUser);
        }
    });

    const send_favor = async (e) => {
        e.preventDefault()

        const ln = localStorage.getItem('lngDestino');
        const lat = localStorage.getItem('latDestino');

        console.log(userData['id'])

        await axios.post(`${endPoint}/register-mandado`, {
            nombre_mandado: nombreMandado,
            user_id: userData['id'],
            descripcion: descripcion,
            ubicacion: direccion,
            longitud: ln,
            latitud: lat,
            status: '1'
        }).then(function () {
            setNombreMandado('')
            setDescripcion('')
            setDireccion('')
            localStorage.removeItem('dirDestino')
            localStorage.removeItem('lngDestino')
            localStorage.removeItem('latDestino')
            OkAlert();
            navigate('/UserProfile')
        }).catch(function (error) {
            if (error.response.status) {
                ErrorAlert();
            }
        });
    }

    const renderRequestFavor = () => {
        return (
            <NextUIProvider theme={temaClaro}>
                <NavBarDesign token={token} />
                <Spacer y={3.5} />
                <Grid.Container gap={3.5} justify="center">
                    <Grid xs={12} lg={4}>
                        <Card>
                            <Card.Body>
                                <Text
                                    alig='center'
                                    h1
                                    size={46}
                                    css={{
                                        textGradient: "45deg, $colorPrincipal_1 -20%, $colorPrincipal_2 100%",
                                    }}
                                    weight="bold"
                                >
                                    ¿Qué quieres pedir?
                                </Text>
                                <form onSubmit={send_favor}>
                                    <Input
                                        underlined
                                        fullWidth
                                        color="error"
                                        size="xl"
                                        label='Nombre del mandado'
                                        value={nombreMandado}
                                        onChange={(e) => {
                                            setNombreMandado(e.target.value)
                                            localStorage.setItem('nombreMandado', nombreMandado);
                                        }}
                                    />
                                    <Spacer y={1.8} />
                                    <Textarea
                                        bordered
                                        status="error"
                                        label="Descripción"
                                        fullWidth
                                        size="xl"
                                        value={descripcion}
                                        onChange={(e) => {
                                            setDescripcion(e.target.value)
                                            localStorage.setItem('descripcion', descripcion)
                                        }}
                                    />
                                    <Spacer y={1.8} />
                                    <Input
                                        underlined
                                        fullWidth
                                        color="error"
                                        size="xl"
                                        label='Direccion donde se realiza el favor'
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                    />
                                    <Spacer y={2} />
                                    <Button
                                        size="lg"
                                        bordered
                                        color="error"
                                        css={{ width: '100%' }}
                                        type='submit'
                                    >
                                        PORFI
                                    </Button>
                                </form>
                            </Card.Body>
                        </Card>
                    </Grid>
                    <Grid xs={12} lg={6}>
                        <Card css = {{
                            paddingBottom: '500px'
                        }}>
                            <React.StrictMode>
                                <MapsApp />
                            </React.StrictMode>
                        </Card>
                    </Grid>
                </Grid.Container>
            </NextUIProvider>
        )
    }

    return (
        <span>
            {
                token
                    ? renderRequestFavor()
                    : navigate('/')
            }
        </span>
    )
}

export default PedirFavor;