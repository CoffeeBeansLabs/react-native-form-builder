import Image from './components/Image';
import InputText from './components/InputText';
import Rating from './components/Rating';
import Checkbox from './components/Checkbox';
import Radio from './components/Radio';
import Dropdown from './components/Dropdown';
import Datepicker from './components/DatePicker';
import Text from './components/Text';
import { componentName } from './constant';

const componentMap = {
  [componentName.IMAGE]: {
    component: Image
  },
  [componentName.IMAGE_WITH_LINK]: {
    component: Image,
  },
  [componentName.TEXT_INPUT]: {
    component: InputText,
    validator: inputTextValidator
  },
  [componentName.RATING]: {
    component: Rating,
  },
  [componentName.DATE_PICKER]: {
    component: Datepicker,
  },
  [componentName.CHECKBOX]: {
    component: Checkbox,
  },
  [componentName.RADIO]: {
    component: Radio,
  },
  [componentName.DROPDOWN]: {
    component: Dropdown,
  },
  [componentName.TEXT_AREA]: {
    component: InputText,
  },
  [componentName.READ_ONLY_TEXT]: {
    component: Text,
  }
};

export const getComponent = id => componentMap[id]?.component || null;

export const getValidator = id => componentMap[id]?.validator || null;

function inputTextValidator(text, inputType) {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-\.])+.([A-Za-z]{2,4})$/;

  if (inputType === 'email') {
    return text && reg.test(text);
  }

  return true;
}
