///////////////////////////////////////////////////////////////
// Create Peer
var config = {"iceServers":[{"url":"stun:stun.l.google.com:19302"}]};
var constraints = {"optional": [{"DtlsSrtpKeyAgreement": true}, {"RtpDataChannels": true }] };
var peerConnection = new webkitRTCPeerConnection(config, constraints);
var iceCandidates = [];

// triggered when an ice candidate is generated locally.
// for  example by .setLocalDescription
peerConnection.onicecandidate = function (event) {
  // we have an ice candidate. 
  // if event has a candidate, event.candidate looks something like this:
  // {
  //   sdpMLineIndex: 0, 
  //   sdpMid: "data", 
  //   candidate: "a=candidate:3408114210 1 udp 2113937151 10.0.1.46 52232 typ host generation 0↵"
  // }
  // We can now add it to the answerer. 
  //if (!event || !event.candidate) return; answerer && answerer.addIceCandidate(event.candidate);
  if (event.candidate) {
    iceCandidates.push(event.candidate)
  };
};


///////////////////////////////////////////////////////////////
// Create the dataChannel
var dataChannel = peerConnection.createDataChannel('RTCDataChannel', {
  //outOfOrderAllowed:true, maxRetransmitNum:0,
  reliable: false // Chrome doesn't work without this. 
});

dataChannel.onmessage = function (event) { console.debug('received a message:', event.data); };
dataChannel.onopen  = function (event) { dataChannel.send('Send text over RTP data ports'); };
dataChannel.onclose = function (event) { console.error(event); };
dataChannel.onerror = function (event) { console.error(event); };

var mediaConstraints = {
  optional: [],
  mandatory: { OfferToReceiveAudio: false, OfferToReceiveVideo: false }
};

// offer must be created **after** we create the dataChannel
peerConnection.createOffer(function (offerDescription) {
  // sessionDescription will look something like this:
  // {sdp: <text blob in SDP format>, type: "offer" }

  // setLocalDescription will trigger multiple onicecandidate events
  peerConnection.setLocalDescription(offerDescription);
  // now peerConnection has a session description peerConnection.localDescription.sdp

  // Now that we have a sessionDescription
  console.log('Sess Desc:', offerDescription);
  document.getElementById('sdp').innerText = JSON.stringify(offerDescription);
  window.offerDescription = offerDescription;
}, function(arg) {
  console.log("Error creating offer:", arg);
}, mediaConstraints);
