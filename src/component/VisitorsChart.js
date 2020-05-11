import React from 'react';
import {Bar, HorizontalBar} from 'react-chartjs-2';

class VisitorChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: {
                labels: this.props.parkLabel,
                datasets: [
                    {
                        label: 'Visitors',
                        data: this.props.visitors,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 159, 64, 0.8)',
                            'rgba(199, 199, 199, 0.8)',
                            'rgba(255, 99, 132, 0.6)',
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(159, 159, 159, 1)',
                        ]

                    }
                ]
            }
        }
    }
    render() {
        console.log(this.props.visitors)
        return (
            <div className="visitorChart">
                <HorizontalBar data={
                        this.state.chartData
                    }
                    options={
                        {
                            title: {
                                display: this.props.searchName,
                                text: this.props.searchName + " National Parks 's Visitors"
                            },
                            legend:{
                                display:true,
                                position:"right"
                            }
                        }
                    }/>
            </div>
        )
    }

}

export default VisitorChart;
