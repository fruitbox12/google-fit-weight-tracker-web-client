import React from 'react'

import { withApi } from '../api'

import DashboardView from '../components/Dashboard'
import AddWeightModal from '../components/AddWeightModal'

class Dashboard extends React.Component {
  state = {
    points: [],
    duration: '',
    weight: null,
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

  addBodyWeight = () => {
    this.props.addBodyWeight(this.state.weight).then(() => {
      this.getWeightData(this.state.duration)
      this.handleCloseModal()
      this.setState({
        weight: null,
      })
    })
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false
    })
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true
    })
  }

  handleWeightChange = (ev) => {
    this.setState({
      weight: ev.target.value
    })
  }

  render() {
    const { handleSignOut, loading } = this.props
    return <div>
      <DashboardView
        points={this.state.points}
        handleSignOut={handleSignOut}
        getWeightData={this.getWeightData}
        duration={this.state.duration}
        addBodyWeight={this.handleOpenModal}
      />
      <AddWeightModal
        handleClose={this.handleCloseModal}
        handleWeightChange={this.handleWeightChange}
        handleAddWeight={this.addBodyWeight}
        value={this.state.weight}
        show={this.state.showModal}
        disabled={loading}
      />
    </div>
  }
};
export default withApi(Dashboard)