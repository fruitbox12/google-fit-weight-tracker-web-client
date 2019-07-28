import React from 'react'

import { withApi } from './api'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Line } from 'react-chartjs-2';

class Dashboard extends React.Component {
  state = {
    points: [],
    duration: '',
  }

  componentDidMount() {
    this.getWeightData('weekly')
  }

  getWeightData = (duration) => {
    this.setState({
      duration,
    })
    this.props.getBodyWeights(duration).then(weightData => {
      this.setState(weightData)
    })
  }

  render() {
    const { signOut, addBodyWeight } = this.props

    let dataPoints = this.state.points.map(dataPoint => dataPoint.value)
    let labels = this.state.points.map(dataPoint => {
      if (this.state.duration === 'hourly') {
        let date = new Date(Number(dataPoint.time))
        return `${date.toLocaleTimeString()}`
      }

      return new Date(Number(dataPoint.time)).toLocaleDateString()
    })

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
          pointRadius: 5,
          pointHitRadius: 10,
          data: [
            ...dataPoints,
          ]
        }
      ]
    };

    return <Container>
      <Row>
        <Col>
          <Button onClick={signOut} variant="danger">Sign Out</Button>
        </Col>

      </Row>

      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          {['weekly', 'daily', 'hourly'].map(duration => {
            return <Button
              key={duration}
              variant={this.state.duration === duration ? 'outline-primary' : 'primary'}
              onClick={() => this.getWeightData(duration)}
            >
              {(() => {
                switch (duration) {
                  case 'weekly':
                    return '3 Months'
                  case 'daily':
                    return '1 Week'
                  case 'hourly':
                    return '1 Day'
                  default:
                    return 'na';
                }
              })()}
            </Button>
          })}

        </Col>
        <Col xs={{ span: 8, offset: 2 }}>
          <Card>
            <Line data={lineData} style={{ width: '80%' }} />
          </Card>
        </Col>
      </Row>
      <Row>

        <Col xs={{ span: 8, offset: 2 }}>
          <h2>Log Entries</h2>
        </Col>
        <Col xs={{ span: 8, offset: 2 }}>
          <Card>
            {this.state.points.filter(point => point.value).map(point => {
              return <div> {new Date(Number(point.time)).toLocaleDateString()} - {point.value}</div>
            })}

          </Card>
        </Col>

      </Row>

      <Button onClick={addBodyWeight}>Add New Entry</Button>
    </Container>
  }
};
export default withApi(Dashboard)