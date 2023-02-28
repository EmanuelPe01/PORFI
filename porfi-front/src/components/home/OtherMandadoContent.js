import React from 'react'
import { Container, Spacer, Text } from "@nextui-org/react";
import { HomeCards } from './HomeCards';
import { MandadoCard} from './MandadoCard';
import imgC1 from '../../img/card1.jpg';
import imgC2 from '../../img/card2.jpg';
import OtherMandado from '../OtherMandados';

export const OtherMandadoContent = ({list_mandados}) => {
    localStorage.removeItem('latDestino')
    localStorage.removeItem('lngDestino')
    return (

        <Container
            alignItems='center'
            justify='center'
        >
            <Spacer y={2} />
            <Text
                align='center'
                h1
                size={60}
                css={{
                    textGradient: "45deg, $colorPrincipal_1 -20%, $colorPrincipal_2 100%",
                }}
                weight="bold">
                Pedidos disponibles
            </Text>
            <Spacer y={2.5} />
            <div className='row row-gap-1 row-cols-1'>
                {list_mandados.map ((mandado) => (
                    <div className='col-12 col-xl-6' key={mandado.id}>
                        <MandadoCard
                            Nombre={mandado.nombre_mandado}
                            Descripcion={mandado.descripcion}
                            Direccion={mandado.ubicacion}
                            id={mandado.id}
                        />
                    </div>
                ))}                
            </div>
        </Container>
    );
};

export default OtherMandadoContent;