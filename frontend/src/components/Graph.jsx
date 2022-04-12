import React from 'react';
import { Line } from 'react-chartjs-2';


function Graph( { dates, time } ) {
  return <>
      <Line

data={
    {
        labels: dates,
        datasets: [

            {
                label: 'Sleep Stats',
                data: time,
                lineTension: 0.4,
                backgroundColor: 'rgba(25, 118, 210, 0.425)',
                fill: true,
                borderColor: 'rgb(25, 118, 210)',
                borderWidth: 3
            },

        ]
    }
}

options={{
    maintainAspectRatio: false,
    scales: {
        xAxes: [{
            gridLines: {
                display: false
            }
        }],
        yAxes: [{
            gridLines: {
                drawOnChartArea: false
            }
        }]
    }
}}
/>
  </>;
}

export default Graph;
