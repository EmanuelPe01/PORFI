import React, { useState } from 'react'
import {
  NextUIProvider, Text, createTheme, Input, Spacer, Card,
  Container, Button
} from '@nextui-org/react';
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

import Swal from 'sweetalert2'

//const endPoint = "http://192.168.100.34:8000/api/register";
const endPoint = "http://127.0.0.1:8000/api/register";

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

export const Register = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigate = useNavigate()

  const store = async (e) => {
    e.preventDefault()

    await axios.post(endPoint, {
      name: name,
      last_name: lastName,
      email: email,
      phone: phone,
      password: pass,
      password_confirmation: confirmPass,
    }).then(function () {
      OkAlert();
      navigate('/');
    }).catch(function (error) {
      if (error.response.status) {
        ErrorAlert();
      }
    });
  }

  return (
    <NextUIProvider theme={temaClaro}>
      <Spacer y={2.5} />
      <Text
        align='center'
        h1
        size={60}
        css={{
          textGradient: "45deg, $colorPrincipal_1 -20%, $colorPrincipal_2 100%",
        }}
        weight="bold">
        Registrate
      </Text>
      <Container
        display='flex'
        alignItems='center'
        justify='center'
        css={{ minHeight: '50vh' }}
      >
        <Card
          css={{ mw: '550px', p: '20px' }}
        >
          <form onSubmit={store}>
            <Spacer y={1.5} />
            <Input
              underlined
              fullWidth
              color="error"
              size="xl"
              labelPlaceholder="Nombre(s)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Spacer y={2} />
            <Input
              underlined
              fullWidth
              color="error"
              size="xl"
              labelPlaceholder="Apellido(s)"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Spacer y={2} />
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
            <Input
              underlined
              fullWidth
              color="error"
              size="xl"
              labelPlaceholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
            <Input.Password
              underlined
              bordered
              fullWidth
              color="error"
              size="xl"
              labelPlaceholder="Confirmar contraseña"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <Spacer y={2} />
            <div className='row row-gap-3 row-cols-1 row-cols-sm-2'>
              <div className='col'>
                <Button
                  size='lg'
                  bordered
                  color="error"
                  type='submit'
                  css={{
                    width: '100%'
                  }}
                >Aceptar</Button>
              </div>
              <div className='col'>
                <Link to="/">
                  <Button
                    size='lg'
                    bordered
                    color="error"
                    css={{
                      width: '100%'
                    }}
                  >Cancelar</Button>
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </Container>
    </NextUIProvider >
  );
}

export default Register;