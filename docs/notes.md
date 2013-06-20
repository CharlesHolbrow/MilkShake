Notes
=====

Glossary
--------

**ICE** - Protocol for Network Address Translation -
[Interactive Connectivity Establishment (ICE): A Protocol for Network Address Translator (NAT) Traversal for Offer/Answer Protocols](http://www.ietf.org/rfc/rfc5245.txt).
ICE agents include STUN and TURN servers.

**STUN** - Session Traversal Utilities for NAT (STUN).
Peers connect to a stun server to find their public facing
addresses.

**TURN** - Traversal Using Relays around NAT (TURN).

**SDP** - Session Description Protocol -
[Wikipedia](http://en.wikipedia.org/wiki/Session_Description_Protocol) - a format for
describing streaming media initialization parameters
[21:53:46.489]

An example sdp from aRTCPeerConnection.localDescription.sdp looks like this:
    "v=0
    o=Mozilla-SIPUA-24.0a1 15165 0 IN IP4 0.0.0.0
    s=SIP Call
    t=0 0
    a=ice-ufrag:1f8009b2
    a=ice-pwd:04f106d867cbba054729ae220b5c9618
    a=fingerprint:sha-256 62:5F:18:CD:23:D3:BD:D9:C9:B4:42:BD:3B:07:2A:6A:EE:B0:06:59:6D:A3:B3:C8:E4:FA:99:B3:37:5E:56:FA
    m=audio 41438 RTP/SAVPF 109 0 8 101
    c=IN IP4 199.87.82.66
    a=rtpmap:109 opus/48000/2
    a=ptime:20
    a=rtpmap:0 PCMU/8000
    a=rtpmap:8 PCMA/8000
    a=rtpmap:101 telephone-event/8000
    a=fmtp:101 0-15
    a=sendrecv
    a=candidate:0 1 UDP 2113667327 10.0.1.46 65468 typ host
    a=candidate:1 1 UDP 1694302207 199.87.82.66 41438 typ srflx raddr 10.0.1.46 rport 65468
    a=candidate:0 2 UDP 2113667326 10.0.1.46 57425 typ host
    a=candidate:1 2 UDP 1694302206 199.87.82.66 38208 typ srflx raddr 10.0.1.46 rport 57425
    m=application 37652 SCTP/DTLS 5000
    c=IN IP4 199.87.82.66
    a=fmtp:5000 protocol=webrtc-datachannel;streams=16
    a=sendrecv
    a=candidate:0 1 UDP 2113667327 10.0.1.46 55401 typ host
    a=candidate:1 1 UDP 1694302207 199.87.82.66 37652 typ srflx raddr 10.0.1.46 rport 55401
    a=candidate:0 2 UDP 2113667326 10.0.1.46 61947 typ host
    a=candidate:1 2 UDP 1694302206 199.87.82.66 46592 typ srflx raddr 10.0.1.46 rport 61947
    "

**ICE Agent** - \[Verify\] A peer trying to connect to
another peer via ICE

The following terms are from the [IEFT ICE Spec](http://www.ietf.org/rfc/rfc5245.txt)

**ICE Peer** - From the perspective of one of the agents in a session, its
peer is the other agent.  Specifically, from the perspective of
the offerer, the peer is the answerer.  From the perspective of
the answerer, the peer is the offerer.

**ICE Transport Address** - The combination of an IP address and transport
protocol (such as UDP or TCP) port.

**ICE Candidate** -  A transport address that is a potential point of contact
for receipt of media.  Candidates also have properties -- their
type (server reflexive, relayed or host), priority, foundation,
and base.

**ICE Component** - A component is a piece of a media stream requiring a
single transport address; a media stream may require multiple
components, each of which has to work for the media stream as a
whole to work.  For media streams based on RTP, there are two
components per media stream -- one for RTP, and one for RTCP.


RTCPeerConnection
=================

Use `webkitRTCPeerConnection`, `mozRTCPeerConnection`, or adapter.js

Pass in TURN/STUN server info on init

    var cfg = {"iceServers":[{"url":"stun:23.21.150.121"}]};
    var con = { 'optional': [{'DtlsSrtpKeyAgreement': true}, {'RtpDataChannels': true }] };
    var connection = new RTCPeerConnection(cfg, con);


The following associated objects are initialized when A RTCPeerConnection is created:

- ICE agent
- RTCPeerConnection signaling state
- ICE gathering state
- ICE gathering state

The following associate object are Initialized to empty sets when RTCPeerConnection is created

- local stream set (represent streams that are currently sent with this peer)
- remote stream set (represent streams that are currently received with this peer)

RTCPeerConnection Interface
===========================

    Constructor (RTCConfiguration configuration, optional MediaConstraints constraints)
    void                  createOffer (RTCSessionDescriptionCallback successCallback, RTCPeerConnectionErrorCallback failureCallback, optional MediaConstraints constraints);
    void                  createAnswer (RTCSessionDescriptionCallback successCallback, RTCPeerConnectionErrorCallback failureCallback, optional MediaConstraints constraints);
    void                  setLocalDescription (RTCSessionDescription description, VoidFunction successCallback, RTCPeerConnectionErrorCallback failureCallback);
    void                  setRemoteDescription (RTCSessionDescription description, VoidFunction successCallback, RTCPeerConnectionErrorCallback failureCallback);
    void                  updateIce (optional RTCConfiguration configuration, optional MediaConstraints constraints);
    void                  addIceCandidate (RTCIceCandidate candidate);
    void                  addStream (MediaStream stream, optional MediaConstraints constraints);
    void                  removeStream (MediaStream stream);
    void                  close ();
    MediaStream?          getStreamById (DOMString streamId);
    sequence<MediaStream> getLocalStreams ();
    sequence<MediaStream> getRemoteStreams ();
    readonly    attribute RTCSessionDescription localDescription;
    readonly    attribute RTCSessionDescription remoteDescription;
    readonly    attribute RTCSignalingState     signalingState;
    readonly    attribute RTCIceGatheringState  iceGatheringState;
    readonly    attribute RTCIceConnectionState iceConnectionState;
                attribute EventHandler          onnegotiationneeded;
                attribute EventHandler          onicecandidate;
                attribute EventHandler          onsignalingstatechange;
                attribute EventHandler          onaddstream;
                attribute EventHandler          onremovestream;
                attribute EventHandler          oniceconnectionstatechange;

The Peer-to-peer data API extends the RTCPeerConnection interface:

    RTCDataChannel createDataChannel ([TreatNullAs=EmptyString] DOMString label, optional RTCDataChannelInit dataChannelDict);
                attribute EventHandler          ondatachannel;

Example of setting up a RTCPeerConnection
=========================================
    // configuration
    var config = {"iceServers":[{"url":"stun:23.21.150.121"}]};
    // constraints - Dtls is for firefox, chrome interoperability
    var constraints = {"optional": [{"DtlsSrtpKeyAgreement": true}, {"RtpDataChannels": true }] };

    //
    peerConnection = new RTCPeerConnection(config, constraints);

    // Firefox. 'reliable' means use tcp, not udp (oversimplification). Reliable Only available in Firefox? [verify];
    dataChannel = peerConnection.createDataChannel('someLabel', {reliable:true});
    // Chrome.
    dataChannel = peerConnection.createDataChannel('someLabel', {outOfOrderAllowed:true, maxRetransmitNum:0});

    // The data channel has the following listeners (see "Section 11. Event Summary" of W3C Docs for details):
    // onopen, onclose, onerror, onmessage

    dataChannel.onmessage = function(event) {
      // A message was successfully received
      console.log(event.data);
    }

The DtlsSrtpKeyAgreement field in the argument to
createDataChannel is required for firefox/chrome
interoperability reasons. [Source](http://www.webrtc.org/interop)

More about [DTSL-SRTP](http://tools.ietf.org/html/draft-ietf-avt-dtls-srtp-07).

Helpful Links
=============
[Webrtc on Chrome for Beginners](https://webrtc-experiment.appspot.com/docs/rtc-datachannel-for-beginners.html);
[Tutorial on some abstraction lib](https://webrtc-experiment.appspot.com/docs/how-to-use-rtcdatachannel.html);


