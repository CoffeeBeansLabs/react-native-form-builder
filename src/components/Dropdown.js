import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function Dropdown(props) {
  const { meta, isMandatory, onChangeInputValue, style } = props;

  const [items, setItems] = useState(meta.items);
  const [selectedItems, setSelectedItems] = useState(meta.selectedItems || []);
  const [selectedItemObjects, setSelectedItemObjects] = useState(
    meta.selectedItemsObject || [],
  );

  // Default is single selection
  meta.single = meta.single ?? true;

  const onSelectItem = (selectedItemIds) => {
    let selectedItemValue = meta.single ? selectedItemIds[0] : selectedItemIds;
    setSelectedItems([].concat(selectedItemValue));
    onChangeInputValue(selectedItemValue);
  };

  const onCancel = () => {
    this.SectionedMultiSelect._removeAllItems();
    setSelectedItems([]);
  };

  const renderSelectText = () => {
    return selectedItemObjects && selectedItemObjects.length
      ? `${selectedItemObjects
          .map((item, i) => {
            let label = `${item.name}, `;
            if (i === selectedItemObjects.length - 1) {
              label = `${item.name}`;
            }
            return label;
          })
          .join('')}`
      : '';
  };

  return (
    <View pointerEvents={'auto'} style={[style?.container, styles.container]}>
      <TouchableOpacity style={{ padding: 0 }}>
        <Text style={[style?.title, styles.title]}>
          {`${meta.text} ${isMandatory ? '*' : ''}`}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          marginTop: 5,
          paddingBottom: 5,
          height: 200,
        }}
      >
        <SectionedMultiSelect
          IconRenderer={Icon}
          single={meta.single}
          selectText={meta.placeholder || 'Select ...'}
          displayKey="name"
          uniqueKey="id"
          subKey="children"
          alwaysShowSelectText={true}
          renderSelectText={renderSelectText}
          confirmText={meta.confirmText || 'Ok'}
          searchPlaceholderText={meta.searchPlaceholder || 'Search'}
          removeAllText={meta.removeAllText || 'Clear'}
          showDropDowns={true}
          readOnlyHeadings={meta.readOnlyHeadings || false}
          showRemoveAll={true}
          selectedItems={selectedItems}
          showChips={false}
          modalWithSafeAreaView={true}
          modalWithTouchable={true}
          items={items}
          onSelectedItemsChange={onSelectItem}
          onSelectedItemObjectsChange={(item) => setSelectedItemObjects(item)}
          noResultsComponent={meta.noResults}
          onCancel={onCancel}
          noItemsComponent={meta.noItems}
          ref={(SectionedMultiSelect) =>
            (this.SectionedMultiSelect = SectionedMultiSelect)
          }
          colors={style?.colors}
          maxItems={meta.maxItems}
          styles={[style?.select, styles.select]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 50,
    marginVertical: 4,
    borderBottomWidth: 1,
    borderColor: '#C3C6CA',
    padding: 5,
    alignSelf: 'center',
  },
  title: {
    position: 'absolute',
    fontSize: (width / 100) * 4,
    fontFamily: 'SFProDisplay-Medium',
  },
  select: {
    itemText: {
      fontWeight: 'normal',
    },
    selectedItemText: {
      fontWeight: 'normal',
    },
    item: {
      paddingHorizontal: 10,
    },
    selectedItem: {
      backgroundColor: 'rgb(250,250,250)',
    },
    selectToggleText: {
      fontSize: (width / 100) * 4,
      marginLeft: -10,
    },
  },
});

Dropdown.propTypes = {
  meta: PropTypes.object.isRequired,
  onChangeInputValue: PropTypes.func,
  isMandatory: PropTypes.bool,
};
