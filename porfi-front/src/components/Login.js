import React, { useEffect, useState } from 'react'
import {
  NextUIProvider, Text, createTheme, Input, Spacer, Card,
  Container, Button, Image
} from '@nextui-org/react';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import logo from '../img/mainLogo.png';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';

//const endPoint = "http://192.168.100.34:8000/api/login";
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

function ErrorAlert() {
  Swal.fire({
    title: '¡Error!',
    text: 'Credenciales inválidas',
    icon: 'error',
    confirmButtonText: 'Aceptar'
  })
}


export const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = cookie.get('userToken');
    if (loggedUser) {
      setToken(loggedUser);
    }
  }, [])

  const start__session = async (e) => {
    e.preventDefault()

    await axios.post(`${endPoint}/login`, {
      email: email,
      password: pass,
    }).then(function (response) {
      setEmail('');
      setPassword('');
      setToken(response.data['token']);
      cookie.set('userToken', response.data['token']);
    }).catch(function (error) {
      if (error.response.status) {
        ErrorAlert();
      }
    });
  }

  const rederFormLogin = () => {
    return (
      <NextUIProvider theme={temaClaro}>
        <Spacer y={2} />
        <Text
          align='center'
          h1
          size={60}
          css={{
            textGradient: "45deg, $colorPrincipal_1 -20%, $colorPrincipal_2 100%",
          }}
          weight="bold">
          ¡Bienvenido!
        </Text>
        <Image
          src={logo}
          objectFit='cover'
          alt="Default Image"
          width={200}
          height={200}
        />
        <Spacer y={2} />
        <Container
          display='flex'
          alignItems='center'
          justify='center'
          css={{ minHeight: '50vh' }}
        >

          <Card
            css={{ mw: '550px', p: '20px' }}
          >
            <Text
              size={30}
              weight="bold"
              css={{
                as: 'center',
                mb: '20px',
              }}
            >
              Iniciar sesión
            </Text>
            <Spacer y={1.5} />
            <form onSubmit={start__session}>
              <Input
                underlined
                fullWidth
                color="error"
                size="xl"
                labelPlaceholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Spacer y={2} />
              <Input.Password
                underlined
                bordered
                fullWidth
                color="error"
                size="xl"
                labelPlaceholder="Contraseña"
                value={pass}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Spacer y={2} />
              <div className='row row-cols-2'>
                <div className='col'>
                  <Text size={16}>¿No tienes cuenta?
                  </Text>
                  <Link to="/sigin" className='link-danger'>
                    Registrate aquí
                  </Link>
                </div>
                <div className='col text-end'>
                  <Link to="" className='link-danger'>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
              <Spacer y={2} />
              <div class="d-grid gap-2 col-12 mx-auto">
                <Button
                  bordered
                  color='error'
                  type='submit'
                  size='lg'
                >
                  Iniciar sesión
                </Button>
              </div>
            </form>
          </Card>
        </Container>
      </NextUIProvider>
    );
  };

  return (
    <span>
      {
        token
          ? navigate('/UserProfile')
          : rederFormLogin()
      }
    </span>
  );
}

export default Login;
