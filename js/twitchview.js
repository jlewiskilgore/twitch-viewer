function getStream() {
	var channels = ["freecodecamp", "gamesdonequick","storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];
	//var channelName = 'gamesdonequick'; //example
	for(var i=0; i < channels.length; i++){
		var channel = channels[i];
		var url = 'https://wind-bow.gomix.me/twitch-api/streams/' + channel;

		var channelData = {
			channel: channels[i]
		};

		$.getJSON(url, channel, function(channelData, status) {
			if(status === 'success'){
				if(channelData.stream !== null){
					console.log("CHANNEL ONLINE!!!");
					var channelName = channelData.stream.channel.name;
					var currentGame = channelData.stream.game;
					var channelUrl = 'https://www.twitch.tv/'+channelName;
					console.log("CHANNEL: " + channelName);
					console.log("CURRENTLY PLAYING: " + currentGame);
					console.log("WATCH AT: " + channelUrl);
				}
				else {
					console.log("CHANNEL NOT ONLINE!");
					console.log(channelData._links.channel);
					console.log(channelData);
				}
			}
		})

	}
}

function refreshResults() {
	alert("refresh!");
}
