import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "../../theme/colors";

interface Props {
  visible: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function AlertDialog({
  visible,
  title = "Confirm",
  message,
  onCancel,
  onConfirm,
  confirmText = "OK",
  cancelText = "Cancel",
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.message}>{message}</Text>

              <View style={styles.row}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelBtn]}
                  onPress={onCancel}
                >
                  <Text style={styles.cancelText}>{cancelText}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.confirmBtn]}
                  onPress={onConfirm}
                >
                  <Text style={styles.confirmText}>{confirmText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.bgOverlay,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "80%",
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },

  message: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  cancelBtn: {
    backgroundColor: "#eee",
  },

  confirmBtn: {
    backgroundColor: Colors.primary,
  },

  cancelText: {
    color: "#333",
  },

  confirmText: {
    color: "#fff",
    fontWeight: "600",
  },
});