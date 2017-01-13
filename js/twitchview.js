var onlineChannels = [];
var offlineChannels = [];
var dneChannels = [];

function getStream(channel) {

	var url = 'https://wind-bow.gomix.me/twitch-api/streams/' + channel;

	$.getJSON(url, function(channelData, status) {
		if(status === 'success'){
			if(channelData.stream !== null){
				console.log("CHANNEL ONLINE!!!");
				var channelName = channelData.stream.channel.name;
				var currentGame = channelData.stream.game;
				var channelUrl = 'https://www.twitch.tv/'+channelName;
				console.log("CHANNEL: " + channelName);
				console.log("CURRENTLY PLAYING: " + currentGame);
				console.log("WATCH AT: " + channelUrl);
				onlineChannels.push(channelData);
			}
			else {
				console.log("CHANNEL NOT ONLINE!");
				console.log(channel);
				getChannel(channel);
			}
		}
	})
}

function getChannel(channelName, offlineArray, dneArray) {
	var url = 'https://wind-bow.gomix.me/twitch-api/channels/' + channelName;

	$.getJSON(url, function(channelData, status) {
			if(status === 'success'){
				if(channelData.status == 404) {
					dneChannels.push(channelData);
				}
				else{
					offlineChannels.push(channelData);
				}
			}
		})
}

function refreshResults() {
	//clear channel arrays
	onlineChannels = [];
	offlineChannels = [];
	dneChannels = [];

	var channels = ["freecodecamp", "gamesdonequick","storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];
	
	for(var i=0; i<channels.length; i++) {
		getStream(channels[i]);
	}
}

 $(document).ajaxStop(function () {
      console.log(onlineChannels);
      console.log(offlineChannels);
      console.log(dneChannels);
  });
