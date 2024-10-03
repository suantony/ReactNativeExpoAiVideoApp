/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';

const useAppWrite = fn => {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  return {refetch, refreshing, data};
};

export default useAppWrite;
