import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import axios from "axios";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigation();

  const onSignIn = async () => {
    if (email && password) {
      if (errorMessage) {
        setErrorMessage("");
      }
      try {
        const { data } = await axios.post(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in`,
          {
            email,
            password,
          }
        );
        setToken(data.token);
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    } else {
      setErrorMessage("You must fill in both email and password inputs.");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.view}>
          <Image
            source={require("../assets/logo-sm.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sign in</Text>
        </View>

        <View style={styles.view}>
          <TextInput
            placeholder="email"
            value={email}
            style={styles.textInput}
            onChangeText={(t) => {
              setEmail(t);
              setErrorMessage("");
            }}
          />
          <TextInput
            placeholder="password"
            value={password}
            secureTextEntry={true}
            style={styles.textInput}
            onChangeText={(t) => {
              setPassword(t);
              setErrorMessage("");
            }}
          />
          <Text color="#FF6066">{errorMessage}</Text>
          <TouchableHighlight
            style={styles.button}
            underlayColor="#FF6066"
            onPress={onSignIn}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableHighlight>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
    flex: 1,
  },
  scrollView: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%",
  },
  view: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
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
  textInput: {
    borderBottomColor: "#FF6066",
    borderBottomWidth: 1,
    width: "70%",
    margin: 16,
    fontSize: 16,
    paddingBottom: 8,
  },
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
});
