import {FlatList, Image, RefreshControl, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import {getAllAndLatestPosts} from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import {useGlobalContext} from '../../context/GlobalProvider';
import {CustomBottomSheet} from '../../components/CustomBottomSheet';
import useCustomBottomSheet from '../../lib/useCustomBottomSheet';
import ItemMenu from '../../components/ItemMenu';

const Home = () => {
  // console.log('render home again');
  const {user} = useGlobalContext();
  const {data: posts, refetch, refreshing} = useAppWrite(getAllAndLatestPosts);
  const {customBottomSheetRef, showBottomSheet} = useCustomBottomSheet();

  return (
    <SafeAreaView
      className="bg-primary h-full"
      edges={['top', 'left', 'right']}>
      <FlatList
        data={posts ? posts.all : []}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item} onPressMenu={() => showBottomSheet(item)} />
        )}
        ListHeaderComponent={() => (
          <View className="my-4 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  className="w-9 h-10"
                  source={images.logoSmall}
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-base font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={posts ? posts.latest : []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload the video"
            isLoading={posts === null}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refetch} />
        }
      />

      <CustomBottomSheet ref={customBottomSheetRef}>
        {({item}) => <ItemMenu selectedItem={item} />}
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default Home;
