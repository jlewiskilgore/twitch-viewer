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

function updateResults() {
	var i;
	//Update Online Streams
	onlineStreams = document.getElementById("online");
	onlineStreams.innerHTML = "<h2><u>ONLINE STREAMS</u></h2>";
	for(i=0; i<onlineChannels.length; i++) {
		onlineStreams.innerHTML += "<p>"+onlineChannels[i].stream.channel.name+"</p>";
	}
	//Update Offline Streams
	offlineStreams = document.getElementById("offline");
	offlineStreams.innerHTML = "<h2><u>OFFLINE STREAMS</u></h2>";
	for(i=0; i<offlineChannels.length; i++) {
		offlineStreams.innerHTML += "<p>"+offlineChannels[i].name+"</p>";
	}
	//Update DNE (Does Not Exist) Streams
	dneStreams = document.getElementById("dne");
	dneStreams.innerHTML = "<h2><u>CHANNELS DO NOT EXIST</u></h2>";
	for(i=0; i<dneChannels.length; i++) {
		dneStreams.innerHTML += "<p>"+dneChannels[i].message+"</p>";
	}
}

$(document).ajaxStop(function () {
    console.log(onlineChannels);
    console.log(offlineChannels);
    console.log(dneChannels);

    updateResults();
});
