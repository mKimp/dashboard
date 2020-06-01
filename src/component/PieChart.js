import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import 'chartjs-plugin-datalabels'

//pie chart used for percentage to compare state 's parks to total us national parks
class PieChart extends React.Component {

    render() {
        const totalPark = this.props.totalData;
        const parkLength = ((this.props.parkLength / totalPark) * 100).toFixed(0);
        const total =  (100 - parkLength).toFixed(0)
        const compareData = [
            parkLength,
            total
        ]
        const chartData = {
            labels: [
                this.props.searchName + " 's Parks" + ":" + this.props.parkLength,
                "Total Parks in the United States: "  + totalPark
            ],
            datasets: [
                {
                    label: 'Percentages',
                    data: compareData,
                    backgroundColor: [
                        '#FB3640',
                        '#43AA8B',       
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
                    plugins: {
                        datalabels: {
                           display: true,
                           color: 'white',
                           formatter:(value) =>{
                            return value + "%"
                        }
                    },
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
