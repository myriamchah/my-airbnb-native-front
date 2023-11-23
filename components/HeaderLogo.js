import { Image, StyleSheet, Text, View } from "react-native";

const HeaderLogo = ({ text }) => {
  return (
    <View style={styles.view}>
      <Image
        source={require("../assets/logo-sm.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{text}</Text>
    </View>
  );
};

export default HeaderLogo;

const styles = StyleSheet.create({
  logo: {
    height: 140,
    width: 140,
  },
  title: {
    color: "gray",
    fontWeight: "600",
    fontSize: 24,
    margin: 24,
    textAlign: "center",
  },
  view: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
