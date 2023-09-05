import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const { width, height } = Dimensions.get('window');

export default function Rating(props) {
  const { name, meta, style, onChangeInputValue, isMandatory } = props;

  const recordRating = (rating) => onChangeInputValue(rating);
  return (
    <View key={name}>
      <Text style={[style?.text, styles.text]}>{`${meta.label} ${
        isMandatory ? '*' : ''
      }`}</Text>
      <AirbnbRating
        onFinishRating={recordRating}
        starContainerStyle={[style?.rating, styles.rating]}
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
    fontSize: (width / 100) * 4,
    fontFamily: 'SFProDisplay-Medium',
  },
  rating: {},
});

Rating.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  style: PropTypes.object,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.bool,
};
