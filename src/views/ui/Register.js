import React, { useState } from "react";

const Register = () => {
  const [csvContent, setCsvContent] = useState("");
  const [fileName, setFileName] = useState("선택안함");

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
        <div className="bg-gray-300 px-4 py-2 font-bold">파일내용</div>
        <div className="p-4 bg-white min-h-[200px]"></div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="bg-button mt-2 px-4 py-2 rounded-pill">등록</button>
      </div>
    </div>
  );
};

export default Register;
