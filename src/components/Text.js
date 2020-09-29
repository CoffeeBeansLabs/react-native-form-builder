import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text as ReactText } from 'react-native';

export default function Text(props) {
  const { name, meta, style } = props;

  return (
    <View key={name}>
      <ReactText style={{ ...style, ...styles.text }}>{meta.text}</ReactText>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    marginTop: 10
  },
});

Text.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  style: PropTypes.object
};
