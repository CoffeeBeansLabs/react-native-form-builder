import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import ReactDatePicker from 'react-native-datepicker';

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';
const CONFIRM_BUTTON_TEXT = 'Confirm';
const CANCEL_BUTTON_TEXT = 'Cancel';

export default function Datepicker(props) {
  const {
    name, value, meta, style, onChangeInputValue, isMandatory
  } = props;

  return (
    <View style={style}>
      <Text style={styles.text}>{`${meta.text || meta.title} ${isMandatory ? '*' : ''}`}</Text>
      <ReactDatePicker
        key={name}
        style={styles.date}
        date={value}
        mode="date"
        format={DEFAULT_DATE_FORMAT}
        confirmBtnText={CONFIRM_BUTTON_TEXT}
        cancelBtnText={CANCEL_BUTTON_TEXT}
        onDateChange={onChangeInputValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    margin: 10,
  },
  date: {
    width: '97%',
    marginLeft: 10,
  },
});

Datepicker.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  value: PropTypes.string,
  style: PropTypes.object,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.bool
};
