import React from 'react';
import {Bar} from 'react-chartjs-2';

//THis is the chart of size of each national park
class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: {
                labels: this.props.parkLabel,
                datasets: [
                    {
                        label: 'Size in Acres',
                        data: this.props.parkSize,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 159, 64, 0.8)',
                            'rgba(199, 199, 199, 0.8)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(159, 159, 159, 1)',
                        ],
                    }
                ]
            }
        }
    }
    render() {
        return (
            <div className="chart">
                <Bar data={
                        this.state.chartData
                    }
                    options={
                        {
                            plugins: { 
                                datalabels: {
                                   display: false //I dont want the labels on this chart
                            },
                        },
                            legend: {
                                display: true,
                                position: "top"
                            }
                        }
 
                        }
                    />
            </div>
        )
    }

}

export default Chart;

