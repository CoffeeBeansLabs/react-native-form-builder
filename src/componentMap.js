import Image from './components/Image'
import InputText from './components/DynamicForm/InputText';
import Rating from './components/DynamicForm/Rating';
import Checkbox from './components/DynamicForm/Checkbox';
import Radio from './components/DynamicForm/Radio';
import Dropdown from './components/DynamicForm/Dropdown';
import Datepicker from './components/DynamicForm/DatePicker'
import Text from './components/DynamicForm/Text';
import { componentName } from './constant'

const componentMap = {
  [componentName.IMAGE] : {
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
}

export const getComponent = (id) => {
  return componentMap[id]?.component || null;
}

export const getValidator = (id) => {
  return componentMap[id]?.validator || null;
} 