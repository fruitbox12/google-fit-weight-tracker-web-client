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

  getWeightData = (duration) => {
    this.setState({
      duration,
    })
    this.props.getBodyWeights(duration).then(weightData => {
      this.setState(weightData)
    })
  }

  initFitnessApiConnection = () => {
    return this.props.initFitnessApiConnection()
  }

  render() {
    const { signOut, addBodyWeight } = this.props
    return <DashboardView
      points={this.state.points}
      signOut={signOut}
      getWeightData={this.getWeightData}
      duration={this.state.duration}
      addBodyWeight={addBodyWeight}
    />
  }
};
export default withApi(Dashboard)