import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import VocChart from "../components/dashboard/VocChart";
import ImprovementChart from "../components/dashboard/ImprovementChart";
import { Badge } from "reactstrap";

function LegendItem({ color, text, textSize }) {
  const dotStyle = {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    padding: "0",
    marginRight: "8px",
    display: "inline-block",
  };
  return (
    <div className="d-flex align-items-center mb-2">
      <Badge style={dotStyle} color={color} />
      <span className={textSize}>{text}</span>
    </div>
  );
}

const Starter = () => {
  return (
    <div>
      <Row className="mb-5" style={{ height: "50vh" }}>
        <Col className="h-100">
          <Card className="h-100">
            <CardHeader>고객의 소리</CardHeader>
            <div className="h-100 d-flex flex-column justify-content-center align-items-center ">
              <LegendItem color="primary" text="긍정 : 50개" textSize="fs-5" />
              <LegendItem color="danger" text="부정 : 50개" textSize="fs-5" />
              <LegendItem
                color="warning"
                text="개선사항 : 50개"
                textSize="fs-5"
              />
            </div>
          </Card>
        </Col>

        <Col className="h-100">
          <Card className="h-100">
            <CardHeader>고객의 소리 (차트)</CardHeader>
            <VocChart />
          </Card>
        </Col>
      </Row>

      <Row className="mb-5" style={{ height: "50vh" }}>
        <Col className="h-100">
          <Card className="h-100">
            <CardHeader>개선사항</CardHeader>
            <div className="h-100 d-flex flex-column justify-content-center align-items-center ">
              <LegendItem
                color="require"
                text="개선 필요 : 50개"
                textSize="fs-5"
              />
              <LegendItem color="improve" text="개선 : 50개" textSize="fs-5" />
              <LegendItem color="test" text="테스트 : 50개" textSize="fs-5" />
              <LegendItem color="complete" text="완료 : 50개" textSize="fs-5" />
            </div>
          </Card>
        </Col>

        <Col className="h-100">
          <Card className="h-100">
            <CardHeader>개선사항 (차트)</CardHeader>
            <ImprovementChart />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
