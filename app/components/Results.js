import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import * as styles from '../styles'
import UserDetail from './UserDetail'
import UserDetailWrapper from './UserDetailWrapper'
import MainContainer from './MainContainer'
import Loading from './Loading'

function StartOver() {
	return (
			<div className = "col-sm-12" style = {styles.space}>
					<Link to = "/playerOne">
						<button type = 'button' className = 'btn btn-lg btn-danger'>Start Over</button>
					</Link>
			</div>
	)
}





function Results ({isLoading, scores, playersInfo}) {
	if (isLoading == true) {
		return (
			<Loading />
		)
	}

	if (scores[0] === scores[1]) {
		return (
		<MainContainer>
			<h1> Its a tie! </h1>
			<StartOver />
		</MainContainer>
		)
	}
	const winningIndex = scores[0] > scores[1] ? 0: 1;
	const losingIndex = winningIndex === 0 ? 1 : 0;
	return(
		<MainContainer>
			<h1>Results</h1>
			<div className = "col-sm-8 col-sm-offset-2">
				<UserDetailWrapper header = "Winner">
					<UserDetail score = {scores[winningIndex]} info = {playersInfo[winningIndex]}/>
				</UserDetailWrapper>
				<UserDetailWrapper header = "Loser">
					<UserDetail score = {scores[losingIndex]} info = {playersInfo[losingIndex]}/>
				</UserDetailWrapper>
			</div>
			<StartOver />
		</MainContainer>
	)
};

Results.PropTypes = {
	isLoading: PropTypes.bool.isRequired,
	playersInfo: PropTypes.array.isRequired,
	scores: PropTypes.array.isRequired
}

export default Results