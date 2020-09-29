# react-native-form-builder

A dynamic form builder for react-native apps.

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

### [Publish on npm](https://www.npmjs.com/package/np)
```shell
$ np
```
