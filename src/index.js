import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements';
import { componentName, skipValidationForFields } from './constant';
import { getComponent, getValidator } from './componentMap';


const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');



const DynamicForm = React.forwardRef(
  ({
    formTemplate, 
    onSubmit, 
    buttonStyles, 
    hideButtons = false, 
    formValues = null, 
    isTherapistQuestionnaire = true, 
    showCarousel = false,
    setCurrentPage = null,
    imgView,
    inputStyle 
  }, ref) => {


    React.useImperativeHandle(ref, () => ({
      submitForm: async function () {
        onSumbitButtonPress();
      },
      nextPage: function () {
        if (activePage < formTemplate.data.length - 1) {
          scrollToIndex(activePage + 1);
          // setCurrentIndex(currentIndex + 1);
        }
      },
      prevPage: function () {
        if (activePage > 0) {
          scrollToIndex(activePage - 1);
          // setCurrentIndex(currentIndex + 1);
        }
      },
    }));


    const refScroll = React.useRef(null);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [formFields, setFormFields] = useState({});
    const [isValidFormFields, setValid] = useState(false);
    const mandatoryFields = formTemplate.data.filter(data => data.is_mandatory);


    // Function to scroll to a specific index
  const scrollToIndex = (index) => {
    if (refScroll.current) {
      refScroll.current.scrollTo({
        x: index * deviceWidth, // Calculate horizontal position based on index
        animated: true, // Smooth scrolling
      });
    }
  };


    useEffect(() => {
      formTemplate.data.sort((a, b) => a.index - b.index);

      if (formValues) {
        setFormFields(formValues);
      } else {
        setFormFields({
          ...formFields,
          ...setDefaultForFields()
        });
      }


    }, [formValues]);

    useEffect(() => {
      const isValid = checkAllMandatoryFields();
      setValid(isValid);
    }, [JSON.stringify(formFields)]);



    const onChangeInputValue = (fieldName, inputType) => value => {
      setFormFields({
        ...formFields,
        [fieldName]: {
          ...formFields[fieldName] || {},
          value,
          inputType,
        }
      });
    };

    const setDefaultForFields = () => {
      const fields = {};
      formTemplate.data.forEach(data => {
        if (data.component === componentName.CHECKBOX) {
          fields[data.field_name] = {
            value: false,
            inputType: data.component,
          };
        }
        if (data.component === componentName.DATE_PICKER) {
          const today = new Date();
          const currentDate = `${today.getFullYear()}-${`0${today.getMonth() + 1}`.slice(-2)}-`
            + `${today.getDate()}`;

          fields[data.field_name] = {
            value: currentDate,
            inputType: data.component,
          };
        }
      });

      return fields;
    };

    const getValue = element => formFields[element.field_name]?.value;

    const onSumbitButtonPress = (sendToTherapist = false) => {

      onSubmit(formFields, sendToTherapist);

    };

    const checkAllMandatoryFields = () => {
      for (const field of mandatoryFields) {
        const key = field.field_name;

        if (skipValidationForFields.includes(field.component)) {
          continue;
        }

        const data = formFields[key];
        const validator = data && getValidator(data.inputType);

        if (!data || (!data.value || (validator && !validator(data.value, key)))
          && (data.value !== false && data.value !== 0)) {
          return false;
        }
      }

      return true;
    };

    const [activePage, setActivePage] = useState(0); // Active page index

  // Handle scroll event to calculate the active page
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x; // Current scroll position
    const currentPage = Math.round(scrollPosition / deviceWidth); // Calculate active page
    setActivePage(currentPage); // Update active page
    console.log('FormBuilder:currentPage', currentPage);
    setCurrentPage && setCurrentPage(currentPage);
  };



    if (showCarousel) {

      const nArray = Array.from({ length: formTemplate?.data?.length }, (_, index) => index);

      return (

        <View style={[styles.container, { width: deviceWidth }]}>

          <ScrollView
            ref={ref => refScroll.current = ref}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // snapToAlignment='center'
            // snapToInterval={true}
            pagingEnabled={true}
            onScroll={handleScroll}
            scrollEventThrottle={16} // Optimize scroll event handling
            style={{flexShrink:1, width: deviceWidth, borderWidth:0 }}
            contentContainerStyle={{minHeight:200, width: 'auto', paddingHorizontal: 0 }}
          >
            {

              formTemplate && formTemplate.data.map(element => {
                const Component = getComponent(element.component);
                return Component && (
                  <Component
                    index={element.index}
                    name={element.field_name}
                    meta={element.meta}
                    style={element.style}
                    value={getValue(element)}
                    onChangeInputValue={onChangeInputValue(element.field_name, element.component)}
                    isMandatory={element.is_mandatory === 'true'}
                    imgView={imgView}
                    inputStyle={inputStyle}
                  />
                );
              })

            }
          </ScrollView>
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {nArray?.map((index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activePage === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>

        </View>


      )

    } else {

      return (
        <View style={styles.container}>
          {
            formTemplate && formTemplate.data.map(element => {
              const Component = getComponent(element.component);
              return Component && (
                <Component
                  index={element.index}
                  name={element.field_name}
                  meta={element.meta}
                  style={element.style}
                  value={getValue(element)}
                  onChangeInputValue={onChangeInputValue(element.field_name, element.component)}
                  isMandatory={element.is_mandatory === 'true'}
                  imgView={imgView}
                  inputStyle={inputStyle}
                />
              );
            })

          }


          {hideButtons ?
            null :
            (isTherapistQuestionnaire ?
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 40 }}>
                <Button
                  accessibilityLabel="submit-button"
                  title="Save Draft"
                  buttonStyle={[styles.button, buttonStyles, { backgroundColor: 'transparent' }]}
                  titleStyle={[styles.buttonText, { color: '#EE7887' }]}
                  onPress={() => onSumbitButtonPress(false)}
                  disabled={!isValidFormFields}
                />
                <Button
                  accessibilityLabel="submit-button"
                  title="Save & Send to Therapist "
                  buttonStyle={[styles.button, buttonStyles]}
                  titleStyle={styles.buttonText}
                  onPress={() => onSumbitButtonPress(true)}
                  disabled={!isValidFormFields}
                />
              </View>

              :
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 40 }}>
                <Button
                  accessibilityLabel="submit-button"
                  title="Save"
                  buttonStyle={[styles.button, buttonStyles, { backgroundColor: 'transparent' }]}
                  titleStyle={[styles.buttonText, { color: '#EE7887' }]}
                  onPress={() => onSumbitButtonPress(false)}
                  disabled={!isValidFormFields}
                />
              </View>
            )
          }
        </View>
      );
    }
  });


export default DynamicForm;

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
  },
  button: {
    // width: '40%',
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    fontWeight: '600'
  },
  page: {
    width: deviceWidth, // Full width for each page
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // Full height of the screen
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#EE7887',
  },
  inactiveDot: {
    backgroundColor: '#FFFFFF',
  },
});

DynamicForm.propTypes = {
  formTemplate: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};