import { Bar } from 'react-chartjs-2';
import { Card } from 'reactstrap';

const DashboardChart = ({ data, loading }) => {
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Card className="m-2 mt-3 p-3 shadow-sm">
      {loading ? <span>Loading ...</span> : (<Bar data={data} options={options} />)}
    </Card>
  )
};

export default DashboardChart;