import { Text, Card, Col } from "@nextui-org/react";


export const HomeCards = ({titulo, descripcion, img, color}) => {
    return (
        <Card>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                <Col>
                    <Text size={12} weight="bold" transform="uppercase" color={color}>
                        {titulo}
                    </Text>
                    <Text h4 color={color}>
                        {descripcion}
                    </Text>
                </Col>
            </Card.Header>
            <Card.Image
                src={img}
                objectFit="cover"
                width="100%"
                height={340}
                alt="Card image background"
            />
        </Card>
    );
}

export default HomeCards;