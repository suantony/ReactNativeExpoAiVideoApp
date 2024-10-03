/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, Image, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import EmptyState from '../../components/EmptyState';
import {getUserPosts, signOut} from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import {useGlobalContext} from '../../context/GlobalProvider';
import {TouchableOpacity} from 'react-native';
import {icons} from '../../constants';
import InfoBox from '../../components/InfoBox';
import {router} from 'expo-router';

const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext();
  const {data: posts} = useAppWrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('/sign-in');
  };
  return (
    <SafeAreaView
      className="bg-primary h-full"
      edges={['top', 'left', 'right']}>
      <FlatList
        data={posts}
        keyExtractor={item => item.$id}
        renderItem={({item}) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logout}>
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image
                source={{uri: user?.avatar}}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-4"
              titleStyles="text-lg"
            />

            <View className="flex-row">
              <InfoBox
                title={posts ? posts.length : 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
            isLoading={posts === null}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
