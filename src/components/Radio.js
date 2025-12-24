import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, Text, Image, TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import { radioButton } from '../constant';

export default function Radio(props) {
  const {
    name, value, meta, onChangeInputValue, isMandatory
  } = props;

  const deviceWidth = Dimensions.get('window').width;
  const onPress = value => () => onChangeInputValue(value);

  return (
    <View key={name} style={[styles.container, props.style]}>
      <Text style={[styles.heading, meta.headingStyle]}>{`${meta.text} ${isMandatory ? '*' : ''}`}</Text>
      
      <ScrollView disabled={meta.isScrollable ? false : true} horizontal={meta.isHorizontal} 
      showsHorizontalScrollIndicator={false}
      style={{ borderWidth:0, width:'100%'}} 
      contentContainerStyle={{ width:'auto'}}>

      {meta.data.map((item, index) => (
        <View key={index} style={styles.radioContainer} >
          
          <TouchableOpacity
            onPressIn={onPress(item.value || item.label)}
            hitSlop={styles.slop}
            style={styles.buttonContainer}
            key={index}
            disabled={meta.disabled}
          >
            <Image
              accessibilityLabel={`choose-option-${item.label}`}
              style={styles.radioButtonImage}
              source={
                value === (item.value || item.label)
                  ? radioButton.selected
                  : radioButton.unselected
              }
            />
            <Text style={[styles.text, meta.optionTextStyle]}>{item.label}</Text>
          </TouchableOpacity>
        </View>
      ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 2
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  radioButtonImage: {
    height: 20,
    width: 20,
    resizeMode: 'contain'
  },
  text: {
    paddingLeft: 10,
  },
  heading: {
    margin: 10
  },
  slop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
  },
  radioContainer: {
    paddingVertical: 10,
    width: 'auto',
    height: 40,
    paddingLeft: 10,
  }
});

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.bool
};
