import React, { useEffect, useState } from 'react'
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { NavBarDesign } from './NavBarDesign';
import { HomeContent } from './home/HomeContent';

////const endPoint = "http://192.168.100.34:8000/api/";
const endPoint = "http://127.0.0.1:8000/api";
const cookie = new Cookies();

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

export const UserProfile = () => {
    const [mandados, setMandados] = useState([]);
    const [UserProfile, setUser] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = cookie.get('userToken');
        if (loggedUser) {
            setToken(loggedUser);
            getDataUser(loggedUser);
            localStorage.removeItem('latDestino')
            localStorage.removeItem('lngDestino')
        }
    }, []);   

    const getAllMandados = async (id) => {
        const response = await axios.get(`${endPoint}/user-mandados/${id}`);
        setMandados(response.data);
    }

    const getDataUser = async (token) => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        const data = await axios.get(`${endPoint}/user-profile`, config);
        localStorage.setItem('userProfile', JSON.stringify(data.data['userData']));
        const userData = data.data['userData'];
        getAllMandados(userData['id']);
      }

    const rederHomeScreen = () => {
        return (
            <NextUIProvider theme={temaClaro}>
                <NavBarDesign token={token} />
                <HomeContent list_mandados={mandados} />
            </NextUIProvider >
        );
    }

    return (
        <span>
            {
                token
                ? rederHomeScreen()
                : navigate('/')
            }
        </span>
    );
}

export default UserProfile;