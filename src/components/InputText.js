import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, TextInput, Text
} from 'react-native';
import { color } from '../styles';

export default function InputText(props) {
  const {
    name, value, meta, style, onChangeInputValue, isMandatory
  } = props;

  return (
    <View key={name}>
      <Text style={styles.text}>{`${meta.label} ${isMandatory && '*'}`}</Text>
      <TextInput
        style={{ ...style, ...styles.textBox(meta.multiline) }}
        value={value || ''}
        underlineColorAndroid="transparent"
        onChangeText={onChangeInputValue}
        accessibilityLabel={`input-${meta.label}`}
        editable
        placeholder={meta.placeholder}
        multiline={meta.multiline}
        numberOfLines={meta.numberOfLines}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    marginTop: 10
  },
  textBox: multiline => ({
    height: !multiline ? 40 : 80,
    borderColor: color.GREY,
    borderWidth: 1,
    borderRadius: 3,
    margin: 10,
    paddingLeft: 10
  }),
});

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  value: PropTypes.string,
  style: PropTypes.object,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.string
};
