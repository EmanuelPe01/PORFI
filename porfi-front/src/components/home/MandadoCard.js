import {
    Button,
    Card, Container, createTheme, Grid, NextUIProvider, Spacer, Text
} from "@nextui-org/react";
import * as React from "react";
import { Link } from "react-router-dom";


const theme = createTheme({
    type: "light", // it could be "light" or "dark"
    theme: {
        colors: {
            background: "#FFF",
            text: "#401714",
            colorPrincipal_1: "#e85b51",
            colorPrincipal_2: "#910838",
        },
        space: {},
        fonts: {},
    },
});
export const MandadoCard = (props) => {
    const { Nombre, Descripcion, Direccion, id } = props;
    return (
        <NextUIProvider theme={theme}>
            <Container
                display="flex"
                alignItems="center"
                justify="center"
                css={{ minHeight: "50vh" }}
            >
                <Card css={{ mw: "550px", p: "20px" }}>
                    <Text
                        align="center"
                        h1
                        size={40}
                        css={{
                            textGradient: "45deg, $colorPrincipal_1 -20%, $colorPrincipal_2 100%",
                        }}
                        eight="bold">
                        {Nombre}
                    </Text>
                    <Card.Body>
                        <Text
                            h3
                            size={30}
                        >
                            Descripción:
                        </Text>
                        <Text
                            size={20}
                            color={"Black"}
                        >
                            {Descripcion}
                        </Text>
                        <Spacer y={1} />
                        <Text
                            h3
                            size={30}
                        >
                            Dirección:
                        </Text>
                        <Text
                            size={20}
                            color={"Black"}
                        >
                            {Direccion}
                        </Text>
                    </Card.Body>
                    <Card.Divider />
                    <Card.Footer>
                        <Link to={`/SeeDetail/${id}`}>
                        <Button
                            bordered color='error'
                            size='lg'
                        >
                            Ver detalles
                        </Button>
                        </Link>
                    </Card.Footer>
                </Card>
            </Container>
        </NextUIProvider>
    )
}

export default MandadoCard;