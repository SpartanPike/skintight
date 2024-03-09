import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {BackHandler} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const Home = ({navigation}) => {
  const [logoutpopup, setLogoutpopup] = useState(false);
  const [useremail, setUseremail] = useState('');
  const [reportStatus, setReportStatus] = useState('');

  useEffect(() => {
    const handleBackPress = async () => {
      const token = await AsyncStorage.getItem('email');
      console.log(token);
      if (token) {
        Alert.alert('Logout Required', 'Please log out to exit the app.');
        return true;
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
  }, []);

  async function logout() {
    await AsyncStorage.removeItem('email');
    navigation.navigate('Login');
  }

  async function getReports() {
    const email = useremail;
    const data = {email};
    console.log(data);
    const res = await axios.post('http://localhost:3001/reports', data);
    if (res.data.status == 200) {
      if (res.data.data == true) {
        setReportStatus('Report is pending');
      }
    }
    if (res.data.status == 404) {
      console.log('no report found');
    }
  }

  useEffect(() => {
    const retrieveIsLoggedIn = async () => {
      try {
        const email = await AsyncStorage.getItem('email');
        setUseremail(email);
      } catch (error) {
        console.error('Error retrieving login status:', error);
      }
    };

    retrieveIsLoggedIn();
  }, []);

  return (
    <>
      {logoutpopup ? (
        <View style={tw`h-full bg-indigo-400 flex justify-center items-center`}>
          <Text style={tw`my-4`}>Do you want to logout?</Text>
          <View style={tw`flex-row gap-10`}>
            <TouchableOpacity
              onPress={() => {
                setLogoutpopup(false);
              }}
              style={tw` border border-gray-300 rounded-xl py-1 px-3`}>
              <Text style={tw`text-gray-300`}>no</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={logout}
              style={tw` border border-gray-300 rounded-xl py-1 px-3`}>
              <Text style={tw`text-gray-300`}>yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View
            style={tw`h-[15%] gap-4 flex-row justify-evenly items-center px-4 rounded-b-3xl w-full bg-indigo-500`}>
            <TextInput
              placeholder="search report"
              style={tw`px-4 h-12 w-[80%] bg-white rounded-full`}
            />
            <TouchableOpacity
              onPress={() => {
                setLogoutpopup(true);
              }}>
              <Image
                source={require('../public/user.png')}
                style={tw`h-10 w-10`}
              />
            </TouchableOpacity>
          </View>

          <ScrollView style={tw`bg-indigo-50 p-4`}>
            <View
              style={tw`bg-white flex-row justify-evenly p-2 border border-indigo-200 mb-5 rounded-xl`}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Testform', {useremail});
                }}>
                <View style={tw` flex items-center p-2`}>
                  <Image
                    source={require('../public/skin.jpeg')}
                    style={tw`h-20 w-20 rounded-full border border-orange-200`}
                  />
                  <Text style={tw` text-lg text-gray-600 text-center`}>
                    new test
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Doctors');
                }}>
                <View style={tw` flex items-center p-2`}>
                  <Image
                    source={require('../public/special.jpeg')}
                    style={tw`h-20 w-20 rounded-full`}
                  />
                  <Text style={tw` text-lg text-gray-600 text-center`}>
                    specialists
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={getReports}>
              <View
                style={tw` p-2 bg-white border border-indigo-200 rounded-lg mb-5`}>
                <Text style={tw` text-lg text-gray-600 `}>
                  Click to check reports →
                </Text>
              </View>
            </TouchableOpacity>

            {reportStatus ? (
              <View
                style={tw` p-2 bg-white border border-indigo-200 rounded-lg mb-5`}>
                <Text style={tw` text-lg text-gray-600 `}>{reportStatus}</Text>
              </View>
            ) : (
              <View
                style={tw` p-2 bg-white border border-indigo-200 rounded-lg mb-5`}>
                <Text style={tw` text-lg text-gray-600 `}></Text>
              </View>
            )}
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Home;
