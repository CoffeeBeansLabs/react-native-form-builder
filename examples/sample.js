import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import DynamicForm from '@coffeebeanslabs/react-native-form-builder';
import { SafeAreaView } from 'react-navigation';

function App() {
  const formTemplate = {
    data: [
      {
        index: 1,
        component: 'image',
        field_name: 'headerImage',
        meta: {
          label: 'alt text for header image',
          source: 'https://homepages.cae.wisc.edu/~ece533/images/pool.png'
        },
        style: {
          width: 300,
          height: 250,
        }
      },
      {
        index: 2,
        component: 'input-text',
        field_name: 'name',
        is_mandatory: 'true',
        meta: {
          label: 'Name',
          placeholder: 'Enter name..'
        }
      },
      {
        index: 3,
        component: 'input-text',
        field_name: 'email',
        is_mandatory: 'true',
        meta: {
          label: 'Email',
          placeholder: 'Enter email..'
        },
        style: {
          color: 'grey'
        }
      },
      {
        index: 4,
        component: 'input-date',
        field_name: 'birthDate',
        is_mandatory: 'true',
        meta: {
          title: 'Birth Date'
        }
      },
      {
        index: 5,
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
      },
      {
        index: 6,
        component: 'input-checkbox',
        field_name: 'love_js',
        meta: {
          text: 'Do you code?',
        }
      },
      {
        index: 7,
        component: 'input-dropdown',
        field_name: 'favJsFramework',
        is_mandatory: 'true',
        meta: {
          text: 'Select your favorite programming language',
          items: [
            {
              label: 'Javascript',
              value: 'js'
            },
            {
              label: 'Golang',
              value: 'golang'
            },
            {
              label: 'Python',
              value: 'python'
            },
          ]
        },
      },
      {
        index: 8,
        component: 'rating',
        field_name: 'tech_rating',
        is_mandatory: 'true',
        meta: {
          label: 'Rate yourself in your favorite programming language',
          count: 8
        },
      },
      {
        index: 9,
        component: 'input-text',
        field_name: 'suggestion',
        is_mandatory: 'false',
        meta: {
          label: 'Few words about yourself..',
          multiline: true,
          numberOfLines: 4,
          placeholder: 'Type here..'
        }
      },
      {
        index: 10,
        component: 'read-only-text',
        field_name: 'termsAndConditions',
        meta: {
          text: 'By submitting this application, you certify that all of the statements made in this application are made in good faith and these statements are true and correct to the best of your knowledge.'
        },
        style: {
          color: "blue",
          fontSize: 15
        }
      }
    ]
  }

  const onSubmit = formFields => {
    // Actions on submit button click.
    console.log('Form submitted with fields: ', formFields);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <DynamicForm formTemplate={formTemplate} onSubmit={onSubmit} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;