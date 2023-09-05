import PropTypes from 'prop-types';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { radioButton } from '../constant';

const { width, height } = Dimensions.get('window');

export default function Radio(props) {
  const { name, value, meta, style, onChangeInputValue, isMandatory } = props;

  const onPress = (value) => () => onChangeInputValue(value);

  return (
    <View key={name} style={[style?.container, styles.container]}>
      <Text style={[style?.title, styles.title]}>{`${meta.text} ${
        isMandatory ? '*' : ''
      }`}</Text>
      {meta.data.map((item, index) => (
        <View
          key={index}
          style={[style?.radioContainer, styles.radioContainer]}
        >
          <TouchableOpacity
            onPressIn={onPress(item.value || item.label)}
            hitSlop={style?.slop || styles.slop}
            style={[style?.button, styles.button]}
            key={index}
          >
            <Image
              accessibilityLabel={`choose-option-${item.label}`}
              style={[style?.radioImage, styles.radioImage]}
              source={
                value === (item.value || item.label)
                  ? radioButton.selected
                  : radioButton.unselected
              }
            />
            <Text style={[style?.text, styles.text]}>{item.label}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    borderRadius: 2,
  },
  button: {
    flexDirection: 'row',
  },
  radioImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  text: {
    paddingLeft: 10,
    fontSize: (width / 100) * 3.2,
    fontFamily: 'SFProDisplay-Medium',
  },
  title: {
    marginTop: 10,
    fontSize: (width / 100) * 4,
    fontFamily: 'SFProDisplay-Medium',
  },
  slop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  radioContainer: {
    paddingVertical: 10,
    width: '100%',
    height: 40,
    paddingLeft: 10,
  },
});

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.bool,
};
