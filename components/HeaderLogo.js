import { Image, Platform, StyleSheet, Text, View } from "react-native";

const HeaderLogo = ({ text, style }) => {
  return (
    <View style={Platform.OS === "android" && styles.headerCentered}>
      <Image
        source={require("../assets/logo-sm.png")}
        style={style}
        resizeMode="contain"
      />
      {text && <Text style={styles.title}>{text}</Text>}
    </View>
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({
  title: {
    color: "gray",
    fontWeight: "600",
    fontSize: 24,
    margin: 24,
    textAlign: "center",
  },
  headerCentered: {
    alignItems: "center",
    justifyContent: "center",
    width: "96%",
  },
});
