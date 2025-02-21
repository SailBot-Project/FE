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

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/starter");
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 h-100 d-flex align-items-center justify-content-center shadow rounded p-5">
        {/* 왼쪽 영역 (배경) */}
        <Col xs={12} md={6} className="bg-light d-md-block h-100"></Col>

        {/* 오른쪽 로그인 폼 */}
        <Col xs={12} md={6} className="h-100 d-flex justify-content-center align-items-center">
          <div className="w-100 p-5">
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
              <Button color="info" className="w-100 mb-2" onClick={handleLogin}>
                로그인
              </Button>

              {/* 회원가입 버튼 */}
              <Button color="info" className="w-100">
                회원가입
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
