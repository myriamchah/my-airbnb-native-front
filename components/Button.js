import { StyleSheet, Text, TouchableHighlight } from "react-native";

const Button = ({ text, onPress }) => {
  return (
    <TouchableHighlight
      style={styles.button}
      underlayColor="#FF6066"
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableHighlight>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: "70%",
    borderColor: "#FF6066",
    borderWidth: 2,
    borderRadius: 50,
    margin: 16,
  },
  buttonText: {
    color: "gray",
    fontWeight: "500",
    fontSize: 18,
  },
  view: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
