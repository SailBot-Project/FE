import { Card, CardBody } from "reactstrap";
import Chart from "react-apexcharts";

const ImprovementChart = () => {
  const options = {
    colors: ["#FF0004", "#FF9900", "#FFEE00", "#46BC06"],
    xaxis: {
      categories: ["2월", "3월", "4월"],
    },
  };
  const series = [
    {
      name: "개선 필요",
      data: [80, 85, 90, 100],
    },
    {
      name: "개선",
      data: [60, 63, 65, 40],
    },
    {
      name: "테스트",
      data: [65, 67, 70, 30],
    },
    {
      name: "완료",
      data: [65, 67, 70, 30],
    },
  ];

  return (
    <Card>
      <CardBody>
        <Chart height="313px" options={options} series={series} type="bar" />
      </CardBody>
    </Card>
  );
};

export default ImprovementChart;
