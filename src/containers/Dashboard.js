import React from 'react'

import { withApi } from '../api'

import DashboardView from '../components/Dashboard'

class Dashboard extends React.Component {
  state = {
    points: [],
    duration: '',
  }

  componentDidMount() {
    this.initFitnessApiConnection().then(() => {
      this.getWeightData('weekly')
    })
  }

  initFitnessApiConnection = () => {
    return this.props.initFitnessApiConnection()
  }

  getWeightData = (duration) => {
    this.setState({
      duration,
    })
    this.props.getBodyWeights(duration).then(weightData => {
      this.setState(weightData)
    })
  }

  addBodyWeight = (weightKg) => {
    this.props.addBodyWeight(weightKg).then(() => {
      this.getWeightData(this.state.duration)
    })
  }

  render() {
    const { signOut } = this.props
    return <DashboardView
      points={this.state.points}
      signOut={signOut}
      getWeightData={this.getWeightData}
      duration={this.state.duration}
      addBodyWeight={this.addBodyWeight}
    />
  }
};
export default withApi(Dashboard)