import {FlatList, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {icons} from '../constants';
import {Video, ResizeMode} from 'expo-av';
import Loading from './Loading';
import {View} from 'react-native';
import {ImageBackground} from 'expo-image';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({activeItem, item}) => {
  const [initialLoading, setInitialLoading] = useState(false);
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-3 ml-3 my-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}>
      {play ? (
        <View className="w-52 h-72 justify-center items-center">
          {initialLoading && <Loading />}
          <Video
            source={{uri: item.video}}
            className="w-full h-full rounded-[35px] bg-white/10"
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onLoadStart={() => setInitialLoading(true)}
            onLoadEnd={() => setInitialLoading(false)}
            onError={() => setInitialLoading(false)}
            onPlaybackStatusUpdate={status => {
              if (status.didJustFinish) {
                setPlay(false);
              }
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}>
          <View className="justify-center items-center w-52 h-72">
            {initialLoading && <Loading />}
            <ImageBackground
              source={{uri: item.thumbnail}}
              className="w-full h-full rounded-[32px] bg-white/10 overflow-hidden shadow-lg shadow-black/40"
              contentFit="cover"
              onLoadStart={() => setInitialLoading(true)}
              onLoadEnd={() => setInitialLoading(false)}
              onError={() => setInitialLoading(false)}
            />
          </View>
          {!initialLoading && (
            <Image
              source={icons.play}
              className="absolute w-12 h-12"
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({posts}) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({viewableItems}) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      horizontal
      data={posts}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.$id}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{itemVisiblePercentThreshold: 70}}
      contentOffset={{x: 170}}
      renderItem={({item}) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
    />
  );
};

export default Trending;
