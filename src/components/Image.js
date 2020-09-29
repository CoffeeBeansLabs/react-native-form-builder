import React from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, StyleSheet, Image as ReactImage, Linking
} from 'react-native';

export default function Image(props) {
  const { name, meta, style } = props;

  const handlePress = () => {
    if (meta.link) {
      Linking.openURL(meta.link);
    }
  };

  return (
    <View key={name}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <ReactImage
          style={{ ...style, ...styles.image }}
          source={{ uri: meta.source }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    alignSelf: 'center'
  },
});

Image.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  style: PropTypes.object,
};
