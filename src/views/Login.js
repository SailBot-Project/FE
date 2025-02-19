import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const Login = () => {
  return (
    <Container fluid className="vh-100 vw-100 d-flex">
      <Row className="w-75 shadow rounded">
        {/* 왼쪽 영역 (배경) */}
        <Col className="bg-light d-md-block"></Col>

        {/* 오른쪽 로그인 폼 */}
        <Col className="p-5">
          <h4 className="mb-4 text-muted">로그인</h4>
          <Form>
            {/* 이메일 입력 */}
            <FormGroup>
              <Label for="email" className="text-muted">
                이메일
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="이메일"
              />
            </FormGroup>

            {/* 비밀번호 입력 */}
            <FormGroup>
              <Label for="password" className="text-muted">
                비밀번호
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="비밀번호"
              />
            </FormGroup>

            {/* 로그인 버튼 */}
            <Button color="info" className="w-100 mb-2">
              로그인
            </Button>

            {/* 회원가입 버튼 */}
            <Button color="info" outline className="w-100">
              회원가입
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
