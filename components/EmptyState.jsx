/* eslint-disable no-unused-expressions */
import {View, Image, Text} from 'react-native';
import React from 'react';
import {images} from '../constants';
import CustomButton from './CustomButton';
import {router} from 'expo-router';
import Loading from './Loading';

const EmptyState = ({
  title,
  subtitle,
  buttonTitle,
  buttonFunction,
  isLoading,
}) => {
  return (
    <View className="justify-center items-center px-4">
      {isLoading ? (
        <View className="w-full h-full items-center ">
          <Loading size="large" />
        </View>
      ) : (
        <>
          <Image
            source={images.empty}
            className="w-[270px] h-[215px]"
            resizeMode="contain"
          />
          <Text className="text-base font-psemibold text-center text-white">
            {title}
          </Text>
          <Text className="font-pmedium text-xs text-gray-100">{subtitle}</Text>

          <CustomButton
            title={buttonTitle ? buttonTitle : 'Create Video'}
            handlePress={
              buttonFunction ? buttonFunction : () => router.push('/create')
            }
            containerStyle="w-full my-5"
          />
        </>
      )}
    </View>
  );
};

export default EmptyState;
