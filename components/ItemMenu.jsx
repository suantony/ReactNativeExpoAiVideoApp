/* eslint-disable react-hooks/exhaustive-deps */
import {View, Text, Image, Alert} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {icons} from '../constants';
import {TouchableOpacity} from 'react-native';
import {useGlobalContext} from '../context/GlobalProvider';
import {updateSavedVideo} from '../lib/appwrite';

const ItemMenu = ({selectedItem}) => {
  const {user} = useGlobalContext();
  const hasMounted = useRef(false);
  const savedByUserArray = selectedItem.saved ?? [];
  let initialStatusIsSaved = null;

  if (savedByUserArray.includes(user.$id)) {
    initialStatusIsSaved = true;
  } else {
    initialStatusIsSaved = false;
  }
  const [isSaved, setIsSaved] = useState(initialStatusIsSaved);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (isSaved) {
      savedByUserArray.push(user.$id);
    } else {
      let index = savedByUserArray.indexOf(user.$id);
      if (index !== -1) {
        savedByUserArray.splice(index, 1);
      }
    }
    updateStatus();
  }, [isSaved]);

  const updateStatus = async () => {
    try {
      await updateSavedVideo(savedByUserArray, selectedItem.$id);
    } catch (error) {
      setIsSaved(!isSaved);
      Alert.alert(error.message);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => setIsSaved(!isSaved)}
      className="justify-center items-center space-y-2">
      <View
        className={`${isSaved ? 'border-gray-100' : 'border-secondary'} border rounded-full p-2`}>
        <Image
          source={icons.save}
          className="w-7 h-7"
          resizeMode="contain"
          tintColor={isSaved ? '#CDCDE0' : '#FF9C01'}
        />
      </View>
      <Text
        className={`${isSaved ? 'text-gray-100' : 'text-secondary'} font-pregular text-sm`}>
        {isSaved ? 'Unsave' : 'Save'}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemMenu;
