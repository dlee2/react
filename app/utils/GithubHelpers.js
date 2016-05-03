import axios from 'axios'

const id = "Your_client_id";
const sec = "YOUR_SECRET_ID"
const param = `?client_id=${id}&client_sec=${sec}`;

function getUserInfo(username){
	return axios.get(`https://api.github.com/users/${username}`)
};

function getRepos(username){
	return axios.get(`https://api.github.com/users/${username}/repos`)
};


function getTotalStars (repos) {
	return repos.data.reduce((prev,current) =>  prev + current.stargazers_count, 0) 
}

async function getPlayersData(player) {
	try {
		const repos = await getRepos(player.login)
		const totalStars = await getTotalStars(repos)
		return {
				followers: player.followers,
				totalStars: totalStars
		}
		console.log(getRepos(player.login))
		console.log(repos)
	} catch (error) {
		console.warn("Error in getPlayersData: ", error)
	}
	
}

function calculateScores (players) {
	return [
		players[0].followers*3 + players[0].totalStars,
		players[1].followers*3 + players[1].totalStars
	]
}



export async function getPlayersInfo(players) {
	try {
		const info = await Promise.all(players.map((username) => getUserInfo(username)))
		return info.map((user) => user.data)
		} catch (error) {
			console.warn("Error in getPlayersInfo: ", error)
	}
}
export async function battle(players) {
	try {
		const playerOneData = getPlayersData(players[0])
		const playerTwoData = getPlayersData(players[1])

		const data = await Promise.all([playerOneData, playerTwoData])
		return await calculateScores(data)
	} catch (error){
		console.warn('Error in get playersData:', error)
	}
}
