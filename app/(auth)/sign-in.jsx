import {View, Image, ScrollView, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import {Link, router} from 'expo-router';
import {getCurrrentUser, signIn} from '../../lib/appwrite';
import {useGlobalContext} from '../../context/GlobalProvider';

const SignIn = () => {
  const {setUser, setIsLoggedIn} = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
    }

    setisSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setisSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="mt-10 text-white font-psemibold text-xl">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={e => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={e => setForm({...form, password: e})}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            containerStyle="mt-7"
            handlePress={submit}
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row">
            <Text className="text-sm text-gray-100 font-pregular">
              Don't have account?{' '}
            </Text>
            <Link
              href="/sign-up"
              className="text-sm text-secondary font-psemibold">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
