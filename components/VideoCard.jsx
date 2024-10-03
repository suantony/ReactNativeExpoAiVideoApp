import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {icons} from '../constants';
import {Video, ResizeMode} from 'expo-av';
import Loading from './Loading';
import {Image} from 'expo-image';

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: {username, avatar},
  },
  onPressMenu,
}) => {
  const [initialLoading, setInitialLoading] = useState(false);
  const [play, setPlay] = useState(false);
  return (
    <View className="px-4 mb-14 items-center">
      <View className="flex-row items-start">
        <View className="flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary p-0.5">
            <Image
              source={{uri: avatar}}
              className="w-full h-full rounded-lg"
              contentFit="contain"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm">{title}</Text>
            <Text className="text-xs text-gray-100 font-pregular">
              {username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <TouchableOpacity onPress={onPressMenu}>
            <Image
              source={icons.menu}
              className="w-5 h-5"
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      {play ? (
        <View className="w-full h-60 rounded-xl relative justify-center items-center">
          {initialLoading && <Loading />}
          <Video
            source={{uri: video}}
            resizeMode={ResizeMode.CONTAIN}
            className="w-full h-full rounded-xl mt-5 bg-white/10"
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
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl relative justify-center items-center"
          onPress={() => setPlay(true)}>
          <View className="w-full h-full justify-center items-center ">
            {initialLoading && <Loading />}
            <Image
              className="w-full h-full rounded-xl mt-5 bg-white/10"
              source={{uri: thumbnail}}
              contentFit="cover"
              onLoadStart={() => setInitialLoading(true)}
              onLoadEnd={() => setInitialLoading(false)}
              onError={() => setInitialLoading(false)}
            />
          </View>

          {!initialLoading && (
            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              contentFit="contain"
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
