import React from 'react'
import Modal from 'react-bootstrap/Modal';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Actividad Mensual',
    },
  },
};
export default function Chart({user, setChartVisible, chartVisible}) {
  const labels = user.activityMonths.map((item) => item.month);
  const datasetData = user.activityMonths.map((item) => item.activityPercentage);
  
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Porcentaje de Actividad',
        data: datasetData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return (
    <Modal  show={chartVisible} >
        <Modal.Header closeButton onHide={() => setChartVisible(false)}>
            <Modal.Title>Informacion del usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Header>Actividad promedio: {user.activityPercentage}</Modal.Header>
          <Line user={user.id} options={options} data={data} />; 
        </Modal.Body>
    </Modal>
  )
}
