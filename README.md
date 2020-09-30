# react-native-form-builder

A basic form builder for react-native apps. Using a user defined template, it renders the required form elements.

<img src="https://user-images.githubusercontent.com/35795619/94670831-aebf0580-0330-11eb-9e59-8589fcf4d4fe.gif" width="300" height="600"/>

### Installation

#### [Via npm](https://www.npmjs.com/package/@coffeebeanslabs/react-native-form-builder)

```shell
$ npm i @coffeebeanslabs/react-native-form-builder
```

#### [Via yarn](https://classic.yarnpkg.com/en/package/@coffeebeanslabs/react-native-form-builder)

```shell
$ yarn add @coffeebeanslabs/react-native-form-builder
```

### Usage

```shell
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import DynamicForm from '@coffeebeanslabs/react-native-form-builder';

function Example(props) {
  const formTemplate = {
    data: [
      {
        component: 'image',
        field_name: 'headerImage',
        meta: {
          label: 'alt text for header image',
          source: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg'
        },
        style: {
          width: 200,
          height: 200
        }
      },
      {
        component: 'input-text',
        field_name: 'name',
        is_mandatory: 'true',
        meta: {
          label: 'Name',
          placeholder: 'Enter name..'
        }
      },
      {
        component: 'input-date',
        field_name: 'birthDate',
        is_mandatory: 'true',
        meta: {
          title: 'Birth Date'
        }
      },
      {
        component: 'input-radio',
        field_name: 'gender',
        is_mandatory: 'true',
        meta: {
          text: 'Your Gender',
          data: [
            {
              label: 'Male',
              value: 'male'
            },
            {
              label: 'Female',
              value: 'female'
            }
          ]
        }
      }
    ]
  }

  const onSubmit = formFields => {
    // Actions on submit button click.
    console.log('Form submitted with fields: ', formFields);
  }

  return (
    <View style={styles.container}>
      <DynamicForm formTemplate={formTemplate} onSubmit={onSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Example;
```

### Props

The component takes following props:

| Prop        | Required  | Type   | Purpose  |
| ------------|-----------| -------| -------|
| formTemplate        | Yes       | Object  | A template representing form components to render (see Form Template for more info) |
| onSubmit        | Yes       | Function  | Callback method when the user clicks on submit button |


#### Form Template

Following properties are used in every template object representing a form element to be rendered:
| Property        | Required  | Type   | Purpose  |
| ------------|-----------| -------| -------|
| component        | Yes       | String  | The name of form component to be rendered (check below for list). |
| index        | Yes       | Number  | The placement index of the form component. |
| field_name        | Yes       | String  | Name of the form field. |
| is_mandatory        | No       | String  | Specifies if a form field is to be mandatorily filled. Until all mandatory fields are not provided by the user, the Submit button remains disabled|
| meta        | Yes       | Object  | Holds component specific props like label, placeholder, value etc. |
| style        | No       | Object  | Custom styles to be applied (Not supported for all components)|


Following form components are available:
- image
- input-checkbox
- input-date
- input-dropdown
- input-radio
- input-text (also supports multiline)
- rating
- read-only-text

*Checkout the example [here](https://github.com/CoffeeBeansLabs/react-native-form-builder/tree/master/examples/sample.js).*


### Feedback

Feel free to open a new Issue with a feature request or report a bug or submit a PR.

Thank you!
