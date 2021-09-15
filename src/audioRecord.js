import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

export default function audioRecord() {
  const [recording, setRecording] = useState();
  const [recordingUri, setRecordingUri] = useState('');
  const [sound, setSound] = useState();

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    setRecordingUri(uri);
  }

  async function playSound() {
    console.log('Loading Sound');
    if (recordingUri) {
      const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
      setSound(sound);

      console.log('Playing Sound');
      await sound.playAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.text}>
          {' '}
          {recording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => playSound()}>
        <Text style={styles.text}> Play Sound</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  button: {
    marginVertical: 5,
    backgroundColor: '#775ada',
    padding: 10,
  },
  text: {
    color: 'white',
  },
});
