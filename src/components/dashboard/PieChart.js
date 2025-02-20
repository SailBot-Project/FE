import React from 'react';
import ApexCharts from 'react-apexcharts';
import { Card, CardBody, CardHeader } from 'reactstrap';  // Card 컴포넌트 추가
import NoResultsMessage from './NoResultMessage';

const PieChart = ({ positive, negative, improvement }) => {
  // 퍼센티지 계산
  const total = positive + negative + improvement;
  const positivePercentage = (positive / total) * 100;
  const negativePercentage = (negative / total) * 100;
  const improvementPercentage = (improvement / total) * 100;

  // 전체 값이 0일 경우 메시지를 표시
  if (total === 0) {
    return <NoResultsMessage />;
  }

  // Pie 차트 데이터 설정
  const chartOptions = {
    chart: {
      type: 'pie',
    },
    labels: ['긍정', '부정', '개선사항'],
    colors: ['#4caf50', '#f44336', '#ff9800'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
          },
        },
      },
    ],
  };

  const chartSeries = [positivePercentage, negativePercentage, improvementPercentage];

  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardHeader>피드백 차트</CardHeader> {/* 카드 헤더 */}
      <CardBody>
        <ApexCharts options={chartOptions} series={chartSeries} type="pie" width="100%" height="300px" />
      </CardBody>
    </Card>
  );
};

export default PieChart;
