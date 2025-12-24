import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, TextInput, Text
} from 'react-native';
import { color } from '../styles';

export default function InputText(props) {
  const {
    name, value, meta, style, onChangeInputValue, isMandatory, imgView, inputStyle
  } = props;

  return (
    <View key={name} style={[meta.containerStyle ,{}]}>
      {imgView ? 
      <View style={styles.yellowMainView}>
        {imgView()}
        <View style={styles.yellowView}>
        <Text style={[styles.yellowTxt]}>{`${meta.label} ${isMandatory ? '*' : ''}`}</Text>
        </View>
        </View> :
        <Text style={[styles.text, meta.textStyle]}>{`${meta.label} ${isMandatory ? '*' : ''}`}</Text>
      }
      <TextInput
        style={{ ...styles.textBox(meta.multiline, meta.numberOfLines), ...style, ...inputStyle }}
        value={value || ''}
        underlineColorAndroid="transparent"
        onChangeText={onChangeInputValue}
        accessibilityLabel={`input-${meta.label}`}
        editable={meta.editable}
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
  textBox: (multiline, numberOfLines) => ({
    height: !multiline ? 40 : 40 * numberOfLines,
    borderColor: color.GREY,
    borderWidth: 1,
    borderRadius: 3,
    margin: 10,
    paddingLeft: 10
  }),
  yellowMainView: {
    flexDirection: 'row',
  },
  yellowView: {
    backgroundColor: '#FDDE02',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    width: '80%',
    marginLeft: 10,
  },
  yellowTxt: {
    fontFamily: 'Nunito-Regular',
    fontSize: 20,
    color: '#444444',
    fontWeight: '600',
    // fontStyle: 'italic',
  }
});

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  value: PropTypes.string,
  style: PropTypes.object,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.bool
};
