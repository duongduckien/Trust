import React, { Component, PureComponent } from 'react';
import {
    StyleSheet, Text, View, TouchableOpacity,
    Image, Dimensions, Modal, Platform, NativeModules
} from 'react-native';
import { RtcEngine, AgoraView } from 'react-native-agora';

// Components
import OperateButton from '../OperateButton';
import { 
    BtnEndCall,
    BtnMute,
    BtnSpeaker,
    BtnSwitchCamera,
    BtnVideo,
    EnableCamera,
    DisableCamera,
    EnablePhotoflash,
    DisablePhotoflash,
    IconMuted,
    IconSpeaker,
} from '../Button/Button';

// Styles
import { styleSheet, styles } from './styles';

// Utilities
import { Helper } from '../../utilities/helper';

// Config
import configData from '../../assets/data/config.json';

const helper = new Helper();

const { Agora } = NativeModules;

if (!Agora) {
    throw new Error("Agora load failed in react-native, please check ur compiler environments");
}

const {
    FPS30,
    FixedLandscape,
    Host,
    AudioProfileDefault,
    AudioScenarioDefault,
} = Agora;

interface IProps {
    channelProfile: number;
    channelName: string;
    videoProfile: number;
    clientRole: number;
    onCancel: Function;
    uid: number;
}

export class AgoraRTCView extends Component<IProps> {

    state = {
        peerIds: [],
        joinSucceed: false,
        isSpeak: true,
        isMute: false,
        isCameraTorch: false,
        disableVideo: false,
        hideButton: false,
        visible: false,
        selectedUid: undefined,
    };

    componentWillMount() {
        const config = {
            appid: configData['appId'],
            channelProfile: this.props.channelProfile,
            videoProfile: this.props.videoProfile,
            clientRole: this.props.clientRole,
            videoEncoderConfig: {
                width: 360,
                height: 480,
                bitrate: 1,
                frameRate: FPS30,
                orientationMode: FixedLandscape,
            },
            audioProfile: AudioProfileDefault,
            audioScenario: AudioScenarioDefault
        };
        RtcEngine.on('firstRemoteVideoDecoded', (data: any) => {
            console.log('[RtcEngine] onFirstRemoteVideoDecoded', data);
        });
        RtcEngine.on('userJoined', (data: any) => {
            console.log('[RtcEngine] onUserJoined', data);
            const { peerIds } = this.state;
            if (peerIds.indexOf(data.uid) === -1) {
                this.setState({
                    peerIds: [...peerIds, data.uid]
                })
            }
        });
        RtcEngine.on('userOffline', (data: any) => {
            console.log('[RtcEngine] onUserOffline', data);
            this.setState({
                peerIds: this.state.peerIds.filter(uid => uid !== data.uid)
            })
        });
        RtcEngine.on('joinChannelSuccess', (data: any) => {
            console.log('[RtcEngine] onJoinChannelSuccess', data);
            RtcEngine.startPreview();
            this.setState({
                joinSucceed: true
            })
        });
        RtcEngine.on('audioVolumeIndication', (data: any) => {
            console.log('[RtcEngine] onAudioVolumeIndication', data);
        });
        RtcEngine.on('clientRoleChanged', (data: any) => {
            console.log("[RtcEngine] onClientRoleChanged", data);
        })
        RtcEngine.on('error', (data: any) => {
            if (data.error === 17) {
                RtcEngine.leaveChannel().then(() => {
                    RtcEngine.destroy();
                    this.props.onCancel(data);
                });
            }
        })
        console.log("[CONFIG]", JSON.stringify(config));
        console.log("[CONFIG.encoderConfig", config.videoEncoderConfig);
        RtcEngine.init(config);
    }

    componentDidMount() {
        RtcEngine.getSdkVersion((version: any) => {
            console.log('[RtcEngine] getSdkVersion', version);
        })

        console.log('[joinChannel] ' + this.props.channelName);
        RtcEngine.joinChannel(this.props.channelName, this.props.uid);
        RtcEngine.enableAudioVolumeIndication(500, 3);
    }

    componentWillUnmount() {
        if (this.state.joinSucceed) {
            RtcEngine.leaveChannel();
            RtcEngine.removeAllListeners();
            RtcEngine.destroy();
        }
    }

    handleCancel() {
        RtcEngine.leaveChannel();
        RtcEngine.removeAllListeners();
        RtcEngine.destroy();
        this.props.onCancel();
    }

    switchCamera() {
        RtcEngine.switchCamera();
    }

    toggleAllRemoteAudioStreams() {
        this.setState({
            isMute: !this.state.isMute
        }, () => {
            RtcEngine.muteAllRemoteAudioStreams(this.state.isMute);
        })
    }

    toggleSpeakerPhone() {
        this.setState({
            isSpeak: !this.state.isSpeak
        }, () => {
            RtcEngine.setDefaultAudioRouteToSpeakerphone(this.state.isSpeak);
        })
    }

    toggleCameraTorch() {
        this.setState({
            isCameraTorch: !this.state.isCameraTorch
        }, () => {
            RtcEngine.setCameraTorchOn(this.state.isCameraTorch).then((res: any) => {
                console.log('setCameraTorch', res);
            })
        })
    }

    toggleVideo() {
        this.setState({
            disableVideo: !this.state.disableVideo
        }, () => {
            this.state.disableVideo ? RtcEngine.enableVideo() : RtcEngine.disableVideo()
        });
    }

    toggleHideButtons() {
        this.setState({
            hideButton: !this.state.hideButton
        })
    }

    onPressVideo(uid: any) {
        this.setState({
            selectedUid: uid
        }, () => {
            this.setState({
                visible: true
            })
        })
    }

    buttonsView(state: any) {
        if (!state.hideButton) {
            return (
                <View>
                    <OperateButton
                        style={{ alignSelf: 'center', marginBottom: -10 }}
                        onPress={this.handleCancel}
                        imgStyle={{ width: 60, height: 60 }}
                        source={BtnEndCall()}
                    />
                    <View style={styleSheet.bottomView}>
                        <OperateButton
                            onPress={this.toggleCameraTorch}
                            imgStyle={{ width: 40, height: 40 }}
                            source={state.isCameraTorch ? EnablePhotoflash() : DisablePhotoflash()}
                        />
                        <OperateButton
                            onPress={this.toggleVideo}
                            source={state.disableVideo ? EnableCamera() : DisableCamera()}
                        />
                    </View>
                    <View style={styleSheet.bottomView}>
                        <OperateButton
                            onPress={this.toggleAllRemoteAudioStreams}
                            source={state.isMute ? IconMuted() : BtnMute()}
                        />
                        <OperateButton
                            onPress={this.switchCamera}
                            source={BtnSwitchCamera()}
                        />
                        <OperateButton
                            onPress={this.toggleSpeakerPhone}
                            source={!state.isSpeaker ? IconSpeaker() : BtnSpeaker()}
                        />
                    </View>
                </View>
            );
        }
    }

    agoraPeerViews = (state: any) => {
        return (state.visible ?
            <View style={styleSheet.videoView} /> :
            <View style={styleSheet.videoView}>
                {
                    state.peerIds.map((uid: any, key: any) => (
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => this.onPressVideo(uid)}
                            key={key}>
                            <AgoraView
                                style={styleSheet.remoteView}
                                zOrderMediaOverlay={true}
                                remoteUid={uid}
                            />
                        </TouchableOpacity>
                    ))
                }
            </View>
        );
    }

    modalView(state: any) {
        return (
            <Modal
                visible={state.visible}
                presentationStyle={'fullScreen'}
                animationType={'slide'}
                onRequestClose={() => { }}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ flex: 1 }}
                    onPress={() => this.setState({
                        visible: false
                    })} >
                    <AgoraView
                        style={{ flex: 1 }}
                        zOrderMediaOverlay={true}
                        remoteUid={this.state.selectedUid}
                    />
                </TouchableOpacity>
            </Modal>
        );
    }

    render() {

        if (!this.state.joinSucceed) {
            return (
                <View style={styleSheet.creatingConf}>
                    <Text>Creating a video conference...</Text>
                </View>
            )
        }

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={this.toggleHideButtons}
                style={styleSheet.container}
            >
                <AgoraView style={styleSheet.localView} showLocalVideo={true} />
                <View style={styleSheet.absView}>
                    <Text>channelName: {this.props.channelName}, peers: {this.state.peerIds.length}</Text>
                    {this.agoraPeerViews(this.state)}
                    {this.buttonsView(this.state)}
                </View>
                {this.modalView(this.state)}
            </TouchableOpacity>
        );

    }

}
