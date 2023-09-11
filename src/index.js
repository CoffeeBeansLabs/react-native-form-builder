import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { getComponent, getValidator } from './componentMap';
import { skipValidationForFields } from './constant';

export default function DynamicForm({ formTemplate, onSubmit, buttonStyles }) {
  const [formFields, setFormFields] = useState({});
  const [isValidFormFields, setValid] = useState(false);
  const mandatoryFields = formTemplate.data.filter((data) => data.is_mandatory);

  useEffect(() => {
    formTemplate.data.sort((a, b) => a.index - b.index);
    setFormFields({
      ...formFields,
      ...setDefaultForFields(),
    });
  }, []);

  useEffect(() => {
    const isValid = checkAllMandatoryFields();
    setValid(isValid);
  }, [JSON.stringify(formFields)]);

  const onChangeInputValue = (fieldName, inputType) => (value) => {
    setFormFields({
      ...formFields,
      [fieldName]: {
        ...(formFields[fieldName] || {}),
        value,
        inputType,
      },
    });
  };

  const setDefaultForFields = () => {
    const fields = {};
    formTemplate.data.forEach((data) => {
      fields[data.field_name] = {
        value: data.value,
        inputType: data.component,
      };
    });

    return fields;
  };

  const getValue = (element) => formFields[element.field_name]?.value;

  const onSumbitButtonPress = () => {
    onSubmit(formFields);
  };

  const checkAllMandatoryFields = () => {
    for (const field of mandatoryFields) {
      const key = field.field_name;

      if (skipValidationForFields.includes(field.component)) {
        continue;
      }

      const data = formFields[key];
      const validator = data && getValidator(data.inputType);

      if (
        !data ||
        ((!data.value || (validator && !validator(data.value, key))) &&
          data.value !== false &&
          data.value !== 0)
      ) {
        return false;
      }
    }

    return true;
  };

  return (
    <View style={styles.container}>
      {formTemplate &&
        formTemplate.data.map((element) => {
          const Component = getComponent(element.component);
          return (
            Component && (
              <Component
                index={element.index}
                name={element.field_name}
                meta={element.meta}
                style={element.style}
                value={getValue(element)}
                onChangeInputValue={onChangeInputValue(
                  element.field_name,
                  element.component,
                )}
                isMandatory={element.is_mandatory === 'true'}
              />
            )
          );
        })}
      <Button
        accessibilityLabel="submit-button"
        title="Submit"
        buttonStyle={[styles.button, buttonStyles]}
        onPress={onSumbitButtonPress}
        disabled={!isValidFormFields}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '40%',
    alignSelf: 'center',
    margin: 20,
  },
});

DynamicForm.propTypes = {
  formTemplate: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
