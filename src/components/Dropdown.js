import React from 'react';
import PropTypes from 'prop-types';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Text, View, StyleSheet, Platform
} from 'react-native';

export default function DropDown(props) {
  const {
    name, meta, isMandatory, onChangeInputValue, index
  } = props;

  const onSelectItem = item => onChangeInputValue(item.value);

  return (
    <View
      key={name}
      style={[
        styles.container,
        Platform.OS === 'ios' && styles.overrideOtherComponent(index)
      ]}
    >
      <Text style={styles.text}>{`${meta.text} ${isMandatory ? '*' : ''}`}</Text>
      <DropDownPicker
        items={meta.items}
        itemStyle={styles.itemStyle}
        zIndex={99}
        onChangeItem={onSelectItem}
        placeholder="Select.."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  overrideOtherComponent: index => ({
    zIndex: 99 - index,
  }),
  text: {
    marginBottom: 10
  },
  itemStyle: {
    justifyContent: 'flex-start'
  }
});

DropDown.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.bool
};
