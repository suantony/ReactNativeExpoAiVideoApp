/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, RefreshControl, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import {getSavedPosts} from '../../lib/appwrite';
import useAppWrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import {router, useLocalSearchParams} from 'expo-router';
import {useGlobalContext} from '../../context/GlobalProvider';
import useCustomBottomSheet from '../../lib/useCustomBottomSheet';
import {CustomBottomSheet} from '../../components/CustomBottomSheet';
import ItemMenu from '../../components/ItemMenu';

const Bookmark = () => {
  const {user} = useGlobalContext();
  const {query} = useLocalSearchParams();
  const {data: posts, refetch} = useAppWrite(() =>
    getSavedPosts(user.$id, query),
  );
  const [refreshing, setRefreshing] = useState(false);
  const {customBottomSheetRef, showBottomSheet} = useCustomBottomSheet();
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView
      className="bg-primary h-full"
      edges={['top', 'left', 'right']}>
      <FlatList
        data={posts}
        keyExtractor={item => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item} onPressMenu={() => showBottomSheet(item)} />
        )}
        ListHeaderComponent={() => (
          <View className="mt-5 mb-2 px-4">
            <Text className="text-xl text-white font-psemibold">
              Saved Videos
            </Text>
            <View className="mt-5 mb-8">
              <SearchInput
                placeholder="Search your saved videos"
                initialQuery={query}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No saved videos found"
            buttonTitle="Back to Explore"
            buttonFunction={() => router.push('/home')}
            isLoading={posts === null}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <CustomBottomSheet ref={customBottomSheetRef}>
        {({item}) => <ItemMenu selectedItem={item} />}
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default Bookmark;
