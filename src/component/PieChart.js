import React from 'react';
import {Doughnut} from 'react-chartjs-2';

class PieChart extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const totalPark = this.props.totalData;
        const parkLength = ((this.props.parkLength / totalPark) * 100).toFixed(0);
        const total =  (100 - parkLength).toFixed(0)
        const compareData = [
            parkLength,
            total
        ]
        console.log(compareData)
        const chartData = {
            labels: [
                this.props.searchName + " 's Parks",
                "Total Parks in the United States"
            ],
            datasets: [
                {
                    label: 'Percentages',
                    data: compareData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',       
                    ],
                    borderColor: [                  
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)',
                    ]

                }
            ]
        }
        return (<div className="chart">
            <Doughnut data={chartData}
                options={
                    {
                        title: {
                            display: this.props.searchName,
                            text: "Percentage Comparasion"
                        },
                        legend: {
                            display: true,
                            position: "bottom"
                        }
                    }
                }/>
        </div>)
    }

}

export default PieChart;
