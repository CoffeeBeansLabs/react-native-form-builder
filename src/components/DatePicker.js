import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';
const CONFIRM_BUTTON_TEXT = 'Confirm';
const CANCEL_BUTTON_TEXT = 'Cancel';
const { width, height } = Dimensions.get('window');

export default function Datepicker(props) {
  const { name, value, meta, style, onChangeInputValue, isMandatory } = props;
  const [show, setShow] = useState(false);
  const [dateValue, setDateValue] = useState(
    value ? new Date(value) : new Date(moment().valueOf()),
  );

  useEffect(() => {
    setDateValue(value ? new Date(value) : new Date(moment().valueOf()));
  }, [value]);

  return (
    <View style={[style?.container, styles.container]}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          padding: 0,
          height: 40,
        }}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => setShow(true)}
      >
        <Text style={[style?.title, styles.title]}>{`${
          meta.text || meta.title
        } ${isMandatory ? '*' : ''}`}</Text>
        <Text style={[style?.date, styles.date]}>
          {dateValue.getDate() +
            '/' +
            (dateValue.getMonth() + 1) +
            '/' +
            dateValue.getFullYear()}
        </Text>
        <DatePicker
          key={name}
          modal={true}
          open={show}
          date={dateValue}
          mode={'date'}
          is24hourSource={true}
          onConfirm={(date) => {
            setShow(false);
            let dateString = date.toISOString(); // Convert date object to string
            onChangeInputValue(dateString); // Pass string to parent function
          }}
          confirmText={CONFIRM_BUTTON_TEXT}
          cancelText={CANCEL_BUTTON_TEXT}
          onCancel={() => {
            setShow(false);
          }}
          style={styles.dateInput}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 50,
    marginVertical: 4,
    borderBottomWidth: 1,
    borderColor: '#C3C6CA',
    padding: 5,
    alignSelf: 'center',
  },
  title: {
    position: 'absolute',
    fontSize: (width / 100) * 4,
    fontFamily: 'SFProDisplay-Medium',
  },
  date: {
    top: (height / 100) * 3,
    justifyContent: 'center',
  },
  dateInput: {
    padding: 0,
    marginTop: (height / 100) * 5,
    alignItems: 'stretch',
  },
});

Datepicker.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  value: PropTypes.string,
  style: PropTypes.object,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.bool,
};
