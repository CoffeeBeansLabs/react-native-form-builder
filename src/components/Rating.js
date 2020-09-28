import React from 'react';
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
      <Text style={styles.text}>{`${meta.label} ${isMandatory && '*'}`}</Text>
      <AirbnbRating
        onFinishRating={recordRating}
        starContainerStyle={{ ...style, ...styles.rating }}
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
