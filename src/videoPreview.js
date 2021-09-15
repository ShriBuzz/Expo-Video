import React from 'react';
import { Video } from 'expo-av';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const VideoPreview = ({ route, navigation }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const { record, save } = route.params;

  if (!route) {
    navigation.goBack();
  }

  const saveVideo = async () => {
    const asset = await MediaLibrary.createAssetAsync(record);
    if (asset) {
      Alert.alert('Save Clip', `Clip saved successfully. ${asset}`);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: record,
        }}
        useNativeControls
        resizeMode='contain'
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {save && (
        <View style={styles.buttonContainer}>
          <Button title={'Save'} onPress={() => saveVideo()} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    position: 'relative',
  },
  video: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});

export default VideoPreview;
