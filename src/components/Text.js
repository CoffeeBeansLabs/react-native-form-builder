import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Text as ReactText, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Text(props) {
  const { name, meta, style } = props;

  return (
    <View key={name}>
      <ReactText style={[style?.text, styles.text]}>{meta.text}</ReactText>
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
});

Text.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  style: PropTypes.object,
};
