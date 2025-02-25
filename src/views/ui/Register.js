import React, { useState } from "react";
import { Card, CardBody, CardHeader, Table } from "reactstrap";
const Register = () => {
  const [csvContent, setCsvContent] = useState("");
  const [fileName, setFileName] = useState("선택안함");

  const data = [
    {
      id: 1,
      date: "2024-02-01",
      name: "곽",
      number: "010",
      email: "kh@naver.com",
      category: "긍정",
      request: "이거이거 개선해줘!",
    },
    {
      id: 2,
      date: "2024-02-01",
      name: "곽",
      number: "010",
      email: "kh@naver.com",
      category: "긍정",
      request: "이거이거 개선해줘!",
    },
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setCsvContent(event.target.result);
      };
      reader.readAsText(file);
    } else {
      alert("유효한 CSV 파일을 선택해주세요.");
    }
  };

  return (
    <div className="d-flex flex-column p-6 ">
      <h3 className="text-lg font-bold">파일업로드</h3>
      <div className="d-flex">
        <label className="btn btn-button rounded-pill">
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileChange}
            hidden
          />
          <span className="m-2">파일 선택</span>
        </label>
      </div>
      <div className="d-flex justify-content-center">
        <button className="bg-button mt-2 px-4 py-2 rounded-pill">
          변환하기
        </button>
      </div>
      <div className="w-full max-w-3xl mt-4 border rounded-md overflow-hidden">
        <Card>
          <CardHeader>파일내용</CardHeader>
          <CardBody>
            <Table bordered className="mt-2">
              <thead>
                <tr className="bg-light">
                  <th>ID</th>
                  <th>등록날짜</th>
                  <th>이름</th>
                  <th>연락처</th>
                  <th>이메일</th>
                  <th>긍정/부정</th>
                  <th>개선사항</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id} className={index === 0 ? "bg-light" : ""}>
                    <td>{item.id}</td>
                    <td>{item.date}</td>
                    <td>{item.name}</td>
                    <td>{item.number}</td>
                    <td>{item.email}</td>
                    <td>{item.category}</td>
                    <td>{item.request}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
      <div className="d-flex justify-content-center">
        <button className="bg-button mt-2 px-4 py-2 rounded-pill">등록</button>
      </div>
    </div>
  );
};

export default Register;
