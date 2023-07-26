import PropTypes from "prop-types";
import React, { useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function DropDown(props) {
	const { name, meta, isMandatory, onChangeInputValue, index } = props;

	const onSelectItem = (item) => onChangeInputValue(item.value);

	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState(meta.items);

	return (
		<View
			key={name}
			style={[
				styles.container,
				Platform.OS === "ios" && styles.overrideOtherComponent(index),
			]}
		>
			<Text style={styles.text}>{`${meta.text} ${
				isMandatory ? "*" : ""
			}`}</Text>
			<DropDownPicker
				open={open}
				value={value}
				items={items}
				setOpen={setOpen}
				setValue={setValue}
				setItems={setItems}
				style={styles.itemStyle}
				zIndex={99}
				onSelectItem={onSelectItem}
				placeholder="Select.."
				dropDownDirection="TOP"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 10,
	},
	overrideOtherComponent: (index) => ({
		zIndex: 99 - index,
	}),
	text: {
		marginBottom: 10,
	},
	itemStyle: {
		justifyContent: "flex-start",
	},
});

DropDown.propTypes = {
	name: PropTypes.string.isRequired,
	meta: PropTypes.object.isRequired,
	index: PropTypes.number,
	onChangeInputValue: PropTypes.func,
	isMandatory: PropTypes.bool,
};
