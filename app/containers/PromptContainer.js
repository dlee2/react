import React, { PropTypes, Component} from 'react'
import Prompt from '../components/Prompt'


class PromptContainer extends Component {
	constructor (){
		super()
		this.state = {
			username: ''
		}
	}
	handleUpdateUser (event) {
		this.setState({
			username: event.target.value
		})
	}
	handleSubmitUser (event) {
		event.preventDefault();
		var username = this.state.username;
		this.setState({
			username:''
		});

		const { playerOne } = this.props.routeParams
		if(playerOne) {
			this.context.router.push({
				pathname:'/battle',
				query: {
					playerOne: playerOne,
					playerTwo: username
				}
			})
		} else {
			this.context.router.push(`/playerTwo/${username}`)

		}
	}
	render () {
		return (
			<Prompt onSubmitUser = {(event) => this.handleSubmitUser(event)}
					onUpdateUser = {(event) => this.handleUpdateUser(event)}
					header = {this.props.route.header}
					username = {this.state.username}/>
		)
	}
}

PromptContainer.propTypes = {
		header: PropTypes.string.isRequired
	}
PromptContainer.contextTypes =  {
		router: React.PropTypes.object.isRequired
	}
export default PromptContainer
