import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
const Doctors = () => {
  const [doc, setDoc] = useState('');
  return (
    <View style={tw`h-full bg-white`}>
      <View style={tw`p-6`}>
        <TextInput
          onChangeText={Text => setDoc(Text)}
          placeholder="search doctors"
          style={tw`h-16 px-4 border border-indigo-200 rounded-full w-full`}
        />
      </View>
    </View>
  );
};

export default Doctors;

const styles = StyleSheet.create({});
