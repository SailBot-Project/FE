import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

const VocChart = () => {
  const options = {
    colors: ["#0D00FF", "#FF0004", "#FFEE00"],
    xaxis: {
      categories: ["2월", "3월", "4월"],
    },
  };
  const series = [
    {
      name: "긍정",
      data: [80, 85, 90],
    },
    {
      name: "부정",
      data: [60, 63, 65],
    },
    {
      name: "개선사항",
      data: [65, 67, 70],
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

export default VocChart;
