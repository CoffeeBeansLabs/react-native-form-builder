import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox as ReactCheckbox } from 'react-native-elements';
import { View } from 'react-native';
import { color } from '../styles';

export default function Checkbox(props) {
  const {
    name, value, meta, style, onChangeInputValue
  } = props;

  const onIconPress = value => () => onChangeInputValue(value);

  return (
    <View key={name}>
      <ReactCheckbox
        title={meta.text || meta.title}
        checked={value}
        style={style}
        onIconPress={onIconPress(!value)}
        checkedColor={color.YELLOW}
      />
    </View>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  value: PropTypes.string,
  style: PropTypes.object,
  onChangeInputValue: PropTypes.func,
};
