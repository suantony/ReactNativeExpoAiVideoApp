import React from 'react';
import {ActivityIndicator} from 'react-native';

const Loading = ({size, color, style}) => {
  return (
    <ActivityIndicator
      size={size ?? 'large'}
      color={color ?? '#FF9C01'}
      className={`${style} absolute`}
    />
  );
};

export default Loading;
