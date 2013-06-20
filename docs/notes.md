Notes
=====

Glossary
--------

ICE - Protocol for Network Address Translation - [Interactive Connectivity Establishment (ICE): A Protocol for Network Address Translator (NAT) Traversal for Offer/Answer Protocols](http://www.ietf.org/rfc/rfc5245.txt). ICE agents include STUN and TURN servers. 

STUN - Session Traversal Utilities for NAT (STUN). Peers connect to a stun server to find their public facing addresses. 

TURN - Traversal Using Relays around NAT (TURN). 

SDP - Session Description Protocol - [SDP](http://tools.ietf.org/html/rfc3264) - a format for describing streaming media initialization parameters

Terms
-----

ICE Agent - \[Check Accuracy\] A peer trying to connect to another peer via ICE


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


