var config = {"iceServers":[{"url":"stun:stun.l.google.com:19302"}]};
var constraints = {"optional": [{"DtlsSrtpKeyAgreement": true}, {"RtpDataChannels": true }] };

// Create Peer
var peerConnection = new webkitRTCPeerConnection(config, constraints);
var iceCandidates = [];

// onicecandidate triggered when an ice candidate is generated
// locally. for  example by .setLocalDescription
peerConnection.onicecandidate = function (event) {
  // we have an ice candidate - and can add it to the answerer. 
  if (!event.candidate) return; 
  peerConnection.addIceCandidate(event.candidate);
  iceCandidates.push(event.candidate);
};


// Create the dataChannel
var dataChannel = peerConnection.createDataChannel('RTCDataChannel', {
  reliable: false // Chrome doesn't work without this. 
});

var mediaConstraints = {
  optional: [],
  mandatory: { OfferToReceiveAudio: false, OfferToReceiveVideo: false }
};

dataChannel.onmessage = function (event) { console.debug('received a message:', event.data); };
dataChannel.onopen  = function (event) { dataChannel.send('Send text over RTP data ports'); };
dataChannel.onclose = function (event) { console.error(event); };
dataChannel.onerror = function (event) { console.error(event); };


// Create answer
var createAnswer = function(offerDescription) {
  offerDescription = new RTCSessionDescription(offerDescription);
  peerConnection.setRemoteDescription(offerDescription);
  peerConnection.createAnswer(function(answerDescription){
    peerConnection.setLocalDescription(answerDescription);
    window.answerDescription =  answerDescription // use this on the other one
  }, null, mediaConstraints);
}
