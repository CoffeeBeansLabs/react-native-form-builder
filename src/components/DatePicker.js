import PropTypes from "prop-types";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DatePicker from "react-native-date-picker";

const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
const CONFIRM_BUTTON_TEXT = "Confirm";
const CANCEL_BUTTON_TEXT = "Cancel";

export default function Datepicker(props) {
	const { name, value, meta, style, onChangeInputValue, isMandatory } = props;

	const [show, setShow] = useState(false);

	return (
		<View style={style}>
			<Text style={styles.text}>{`${meta.text || meta.title} ${
				isMandatory ? "*" : ""
			}`}</Text>
			<DatePicker
				key={name}
				modal={true}
				open={show}
				date={value}
				mode={"date"}
				is24hourSource={true}
				onConfirm={onChangeInputValue}
				confirmText={CONFIRM_BUTTON_TEXT}
				cancelText={CANCEL_BUTTON_TEXT}
				onCancel={() => {
					setShow(false);
				}}
				style={styles.date}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		margin: 10,
	},
	date: {
		width: "97%",
		marginLeft: 10,
	},
});

Datepicker.propTypes = {
	name: PropTypes.string.isRequired,
	meta: PropTypes.object.isRequired,
	value: PropTypes.string,
	style: PropTypes.object,
	onChangeInputValue: PropTypes.func,
	isMandatory: PropTypes.bool,
};
