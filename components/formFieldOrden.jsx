import { View, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { React, useState } from 'react';

import '../global.css';

const FormFieldOrden = ({
  title,
  value,
  onChangeText,
  otherStyles,
  placeholder,
  ...props
}) => {
  const [showComponent, setshowComponent] = useState(false);

  return (
    <View className=' '>
      <Text className='font-bold'>{title}</Text>
      <View className='my-1'>
        <TextInput
          className='text-black border border-black rounded-lg h-10'
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={title === 'Component' && !showComponent}
          placeholder={placeholder}
          placeholderTextColor={'gray'}
        ></TextInput>
      </View>
    </View>
  );
};
export default FormFieldOrden;
