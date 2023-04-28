import PropTypes from 'prop-types';
import React from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { color } from '../styles';

export default function File(props) {
  const { name, value, meta, style, onChangeInputValue, isMandatory } = props;

  const _handlePress = async () => {
    console.log('_handlePress 1');
    await props.meta.handlePress();
    console.log('_handlePress 2', value);
    onChangeInputValue(meta.source);
    console.log('_handlePress zz');
  };

  return (
    <View key={name}>
      <TouchableOpacity onPress={_handlePress} activeOpacity={0.8}>
        <Text style={styles.text}>{`${meta.label} ${
          isMandatory ? '*' : ''
        }`}</Text>
        <TextInput
          style={{
            ...styles.textBox,
            ...style,
          }}
          value={value || ''}
          underlineColorAndroid="transparent"
          // onChangeText={onChangeInputValue}
          accessibilityLabel={`input-${meta.label}`}
          // editable={false}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    marginTop: 10,
  },
  textBox: {
    opacity: 0,
    height: 0,
    margin: 0,
    // height: 40,
    // margin: 10,
    borderColor: color.GREY,
    borderWidth: 1,
    borderRadius: 3,
    paddingLeft: 10,
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

File.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  value: PropTypes.string,
  style: PropTypes.object,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.bool,
};
