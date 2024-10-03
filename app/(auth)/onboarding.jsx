import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Image} from 'expo-image';
import {images} from '../../constants';
import CustomButton from '../../components/CustomButton';
import {router} from 'expo-router';
import {StatusBar} from 'expo-status-bar';

const Onboarding = () => {
  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            contentFit="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] max-h-[300px] w-full h-full"
            contentFit="contain"
          />

          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center mx-8">
              Discover Endless Possibilities with{' '}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-2"
              contentFit="contain"
            />
          </View>

          <Text className="mt-7 text-gray-100 text-center font-pregular text-sm">
            Where creativity meets inovation embark on a journey of limitless
            exploration with Aora
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => {
              router.push('/sign-in');
            }}
            containerStyle="mt-7 w-full"
          />

          <StatusBar backgroundColor="#161622" style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Onboarding;
