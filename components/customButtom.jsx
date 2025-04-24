import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

import '../global.css';

export default function CustomButtom({ title, touch, disabled }) {
  return (
    <TouchableOpacity
      className='bg-gray-800 p-2 rounded-lg mt-4 mb-4 w-full'
      onPress={touch}
      disabled={disabled}
    >
      <Text className='text-center text-white'>{title}</Text>
    </TouchableOpacity>
  );
}
