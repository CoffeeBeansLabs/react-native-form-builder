import React from 'react';
import PropTypes from 'prop-types';
import { AirbnbRating } from 'react-native-ratings';
import {
  View, StyleSheet, Text
} from 'react-native';

export default function Rating(props) {
  const {
    name, meta, style, onChangeInputValue, isMandatory
  } = props;

  const recordRating = rating => onChangeInputValue(rating);
  return (
    <View key={name}>
      <Text style={styles.text}>{`${meta.label} ${isMandatory ? '*' : ''}`}</Text>
      <AirbnbRating
        onFinishRating={recordRating}
        starContainerStyle={{ ...style, ...styles.rating }}
        count={meta.count || 5}
        defaultRating={0}
        showRating={false}
        size={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    marginTop: 10,
  },
  rating: {
  }
});


Rating.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  style: PropTypes.object,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.bool
};
