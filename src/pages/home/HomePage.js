import UserPost from "components/userpost/UserPost";
import BasePage from "pages/base/BasePage"
import {
    Navbar,
    Nav,
    Dropdown,
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
    FaChild

} from "react-icons/fa";

const activeKey = 0;
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
                                    <Panel bordered shaded>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" ,alignItems: "center" }}>
                                            <FaImage style={{margin:"0 5px"}} color="lightblue" size="20" /> <b>Image</b>
                                        </div>
                                    </Panel>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Panel bordered shaded>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" ,alignItems: "center" }}>
                                            <FaVideo style={{margin:"0 5px"}} color="salmon" size="20" /> <b>Video</b>
                                        </div>
                                    </Panel>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Panel bordered shaded style={{cursor:"pointer"}}>
                                        <div style={{ display: "flex", flexDirection: "row",justifyContent: "center" ,alignItems: "center" }}>
                                            <FaListUl style={{margin:"0 5px"}} color="yellowgreen" size="20" /> <b>Text</b>
                                        </div>
                                    </Panel>
                                </Col>
                                <Col xs={12} md={6}>
                                    <Panel bordered shaded>
                                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" ,alignItems: "center" }}>
                                            <FaChild style={{margin:"0 5px"}} color="gold" size="20" /> <b>Achivement</b>
                                        </div>
                                    </Panel>
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