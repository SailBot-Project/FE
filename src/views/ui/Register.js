import React, { useState } from "react";

const Register = () => {
  const [csvContent, setCsvContent] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // CSV 파일 MIME 타입은 'text/csv' 혹은 'application/vnd.ms-excel'일 수 있음
    if (file && (file.type === "text/csv" || file.name.endsWith(".csv"))) {
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
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>CSV 파일 업로드</h1>
      <input type="file" accept=".csv,text/csv" onChange={handleFileChange} />
      {csvContent && (
        <div style={{ marginTop: "20px" }}>
          <h2>업로드된 CSV 내용</h2>
          <pre
            style={{
              background: "#f4f4f4",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            {csvContent}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Register;
