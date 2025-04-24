import { View, TextInput, TouchableOpacity } from 'react-native';
import { React } from 'react';

import '../global.css';

const Input = ({ placeholder, RightIcon, value, onChangeText, secure }) => {
  return (
    <View className='h-8 border mt-6 rounded-xl flex-row justify-between items-center '>
      <TextInput
        className='w-[85%] '
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secure}
      />
      <TouchableOpacity className='mr-2' onPress={() => {}}>
        {RightIcon && <RightIcon size={16} color='black' />}
      </TouchableOpacity>
    </View>
  );
};
export default Input;
