import UserPost from "components/userpost/UserPost";
import BasePage from "pages/base/BasePage"
import {
    Icon,
    Grid,
    Row,
    Col,
    Panel,
    Input,
    InputGroup
} from "rsuite";
import {
    FaImage,
    FaVideo,
    FaListUl,
    FaCamera

} from "react-icons/fa";
import ButtonCard from "components/buttonCard/ButtonCard";

const username = "Jhon";
const Homepage = () => {
    return (
        <BasePage>
            <Grid fluid style={{ marginTop: 10 }}>
                <Row>
                    <Col xsHidden md={5}>
                        <Panel bordered header="Summary">

                        </Panel>
                    </Col>
                    <Col xs={24} md={14}>
                        {/* Upper Post Box */}
                        <Panel shaded bordered>
                            <Row>
                                <InputGroup>
                                    <Input icon block placeholder={`Hi ${username}, Anything for today ?`} />
                                    <InputGroup.Addon>
                                        <Icon icon="question" />
                                    </InputGroup.Addon>
                                </InputGroup>
                            </Row>
                            <Row style={{ marginTop: 12 }}>
                                <Col xs={12} md={6}>
                                    <ButtonCard label="Photo">
                                        <FaImage style={{ margin: "0 5px" }} color="lightblue" size="20" />
                                    </ButtonCard>
                                </Col>
                                <Col xs={12} md={6}>
                                    <ButtonCard label="Video">
                                        <FaVideo style={{ margin: "0 5px" }} color="salmon" size="20" />
                                    </ButtonCard>
                                </Col>
                                <Col xs={12} md={6}>
                                    <ButtonCard label="Text">
                                        <FaListUl style={{ margin: "0 5px" }} color="yellowgreen" size="20" />
                                    </ButtonCard>
                                </Col>
                                <Col xs={12} md={6}>
                                    <ButtonCard label="Camera">
                                        <FaCamera style={{ margin: "0 5px" }} color="gold" size="20" />
                                    </ButtonCard>
                                </Col>
                            </Row>
                        </Panel>
                        {/* User Post's */}
                        <UserPost />


                    </Col>
                    <Col xsHidden md={5}>
                    </Col>
                </Row>
            </Grid>
        </BasePage>
    )
}

export default Homepage