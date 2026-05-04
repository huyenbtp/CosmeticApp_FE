import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../../theme/colors";
import dayjs from "dayjs";
import { useState } from "react";

export default function DatePicker({
  placeholder = "Pick a date",
  date,
  setDate,
  minimumDate,
  maximumDate,
}: {
  placeholder?: string;
  date: string,
  setDate: (date: string) => void;
  minimumDate?: Date;
  maximumDate?: Date;
}) {
  const [show, setShow] = useState(false);

  const onChange = (_: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) setDate(selectedDate.toISOString());
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShow(true)} style={[styles.container]}>
        {date ? (
          <Text>
            {dayjs(date).format("D/M/YYYY")}
          </Text>
        ) : (
          <Text style={{color: Colors.textPlaceholder}}>
            {placeholder}
          </Text>
        )}
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={new Date(date)}
          mode="date"
          display="default"
          onChange={onChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgInput,
    padding: 12,
    borderRadius: 6,
  },
})