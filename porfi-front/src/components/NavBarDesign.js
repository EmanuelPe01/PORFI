import React from 'react'
import { Navbar, Text, Image, Button } from "@nextui-org/react";
import logo from '../img/miniLogo.png';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

export const NavBarDesign = ({ token }) => {
    const navigate = useNavigate();
    const LinkDesign = ({ label, url }) => {
        return (
            <Link
                to={url}
                className="fs-5 link-danger"
            >
                {label}
            </Link>
        );
    };

    const loggout = async () => {
        cookie.remove('userToken');
        localStorage.clear();
        navigate('/');
    }

    return (
        <Navbar isBordered variant="floating">
            <Navbar.Toggle showIn="xs" />
            <Navbar.Brand
                css={{
                    "@xs": {
                        w: "12%",
                    },
                }}>
                <Image
                    src={logo}
                    objectFit='cover'
                    alt="Default Image"
                    width={30}
                    height={30}
                />
                <Text
                    b
                    hideIn="xs"
                    className='fs-2'
                    css={{
                        textGradient: "45deg, $colorPrincipal_1 -20%, $colorPrincipal_2 100%",
                    }}
                >
                    PORFI
                </Text>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
                <Navbar.Link><LinkDesign label="Inicio" url="/UserProfile" /></Navbar.Link>
                <Navbar.Link><LinkDesign label="Pedir favor" url="/RequestFavor" /></Navbar.Link>
                <Navbar.Link><LinkDesign label="Realizar favor" url="/DoFavor" /></Navbar.Link>
                <Navbar.Link><Button color="error" auto onPress={loggout}>Cerrar sesión</Button></Navbar.Link>
            </Navbar.Content>
            <Navbar.Collapse>
                <Navbar.CollapseItem><LinkDesign label="Inicio" url="/" /></Navbar.CollapseItem>
                <Navbar.CollapseItem><LinkDesign label="Pedir favor" url="/RequestFavor" /></Navbar.CollapseItem>
                <Navbar.CollapseItem><LinkDesign label="Realizar favor" url="/DoFavor" /></Navbar.CollapseItem>
                <Navbar.CollapseItem><Button color="error" auto onPress={loggout}>Cerrar sesión</Button></Navbar.CollapseItem>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBarDesign;