function getStream() {
	var channelName = 'gamedonequick'; //example
	$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + channelName + 'gamesdonequick?callback=?', data => {
	    console.log(data.stream.game);
	})
}

function refreshResults() {
	alert("refresh!");
}
