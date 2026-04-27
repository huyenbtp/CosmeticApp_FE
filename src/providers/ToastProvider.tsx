import {
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import {
  createContext,
  useContext,
  useState,
  useRef,
} from "react";
import { Colors } from "../theme/colors";

type ToastType = "success" | "error" | "warning" | "info" | "";

interface ToastState {
  message: string;
  type: ToastType;
  visible: boolean;
}

const ToastContext = createContext<any>(null);

export const ToastProvider = ({ children }: any) => {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
    visible: false,
  });

  const opacity = useRef(new Animated.Value(0)).current;

  const showMessage = (message: string, type: ToastType = "success") => {
    setToast({ message, type, visible: true });

    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      });
    }, 2000);
  };

  const getBgColor = () => {
    switch (toast.type) {
      case "success":
        return Colors.bgSuccess1;
      case "error":
        return Colors.bgError1;
      case "warning":
        return Colors.bgWarning1;
      case "info":
        return Colors.bgInfo1;
      default:
        return Colors.primary50;
    }
  };

  const getTextColor = () => {
    switch (toast.type) {
      case "success":
        return Colors.textSuccess1;
      case "error":
        return Colors.textError1;
      case "warning":
        return Colors.textWarning1;
      case "info":
        return Colors.textInfo1;
      default:
        return Colors.primary600;
    }
  };

  return (
    <ToastContext.Provider value={{ showMessage }}>
      {children}

      {toast.visible && (
        <Animated.View
          style={[
            styles.container,
            { opacity, backgroundColor: getBgColor() },
          ]}
        >
          <Text style={[styles.text, { color: getTextColor() }]}>{toast.message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  text: {
    color: Colors.textInverse,
    fontWeight: "500",
  },
});