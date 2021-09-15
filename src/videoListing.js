import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as VideoThumbnails from 'expo-video-thumbnails';

const VideoList = ({ navigation }) => {
  const [videoFiles, setVideoFiles] = useState([]);
  const cols = 3;
  const itemWidth = Dimensions.get('window').width / cols;

  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    const permission = await MediaLibrary.getPermissionsAsync();
    if (!permission.granted && permission.canAskAgain) {
      const { status, canAskAgain } =
        await MediaLibrary.requestPermissionsAsync();
      if (status === 'denied' && canAskAgain) {
        // display some allert or request again to read media files.
        getPermission();
      }

      if (status === 'granted') {
        // we want to get all the video files
        getVideoFiles();
      }

      if (status === 'denied' && !canAskAgain) {
        // we want to display some error to the user
      }
    }
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      // we want to get all the video files
      getVideoFiles();
    }
  };

  const getVideoFiles = async () => {
    let media = await MediaLibrary.getAssetsAsync({ mediaType: 'video' });
    media = await MediaLibrary.getAssetsAsync({
      mediaType: 'video',
      first: media.totalCount,
    });

    const mediaList = media.assets;
    const promises = mediaList.map(async (asset) => {
      const { uri } = await VideoThumbnails.getThumbnailAsync(asset.uri, {
        time: 60000,
      });
      let temp = { ...asset, src: uri };
      return temp;
    });

    const newMediaList = await Promise.all(promises);

    setVideoFiles(newMediaList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={videoFiles}
        keyExtractor={(item) => item.id}
        numColumns={cols}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (item.uri) navigation.navigate('Video', { record: item.uri });
            }}
            style={[styles.item, { width: itemWidth }]}
          >
            <Image
              source={{ uri: item.src }}
              style={[styles.imageThumbnail, { width: itemWidth }]}
            />
            <Text numberOfLines={1} style={styles.videoTitle}>
              {item.filename}
            </Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  item: {
    // flex: 1,
    // flexDirection: 'column',
    margin: 1,
  },
  videoTitle: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
  },
  imageThumbnail: {
    height: 100,
  },
});

export default VideoList;
