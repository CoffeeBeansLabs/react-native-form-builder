export const componentName = {
  CHECKBOX: 'input-checkbox',
  DATE_PICKER: 'input-date',
  DROPDOWN: 'input-dropdown',
  IMAGE_WITH_LINK: 'image-with-link',
  IMAGE: 'image',
  RADIO: 'input-radio',
  RATING: 'rating',
  READ_ONLY_TEXT: 'read-only-text',
  TEXT_AREA: 'input-textarea',
  TEXT_INPUT: 'input-text'
};

export const radioButton = {
  selected: require('./assets/selectedRadio.png'),
  unselected: require('./assets/unselectedRadio.png')
};

// TODO: Need to remove isMandatory for below fields from template json.
export const skipValidationForFields = ['image', 'image-with-link', 'read-only-text'];
