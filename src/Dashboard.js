import React from 'react'

import { withApi } from './api'

import Button from 'react-bootstrap/Button'
import { Line } from 'react-chartjs-2';

class Dashboard extends React.Component {
  period = 60 * 60 * 1000 * 24 * 7
  timeNow = new Date().getTime()

  state = {
    start: this.timeNow - this.period,
    end: this.timeNow,
    points: [],
  }

  getWeightData = (duration) => {
    this.props.getBodyWeights(duration).then(weightData => {
      this.setState(weightData)
    })
  }

  render() {
    const { signOut, addBodyWeight } = this.props

    let dataPoints = this.state.points.map(dataPoint => dataPoint.value)
    let labels = this.state.points.map(dataPoint => dataPoint.time)

    const lineData = {
      labels,
      datasets: [
        {
          label: 'My weight',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [
            ...dataPoints,
          ]
        }
      ]
    };

    return <div>
      <Button onClick={signOut}>Sign Out</Button>
      Im a dashboard
      <Line data={lineData} style={{ width: '80%' }} />
      <Button onClick={() => this.getWeightData('weekly')}>3 Months</Button>
      <Button onClick={() => this.getWeightData('daily')}>1 Week</Button>
      <Button onClick={() => this.getWeightData('hourly')}>1 Day</Button>
      <Button onClick={addBodyWeight}>Add Data</Button>
      {/* {this.state.points.map(point => {
        return <div>{point.value} - {point.time}</div>
      })} */}
    </div>
  }
};
export default withApi(Dashboard)