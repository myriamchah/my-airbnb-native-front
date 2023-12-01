import { useState } from "react";
import axios from "axios";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import HeaderLogo from "../components/HeaderLogo";
import Button from "../components/Button";

export default function SignInScreen({ setTokenAndId, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

        setTokenAndId(data.token, data.id);
      } catch (error) {
        console.log("coucouc");
        console.log(error);
        setErrorMessage(error.response.data.error);
      }
    } else {
      setErrorMessage("You must fill in both email and password inputs.");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
        <HeaderLogo text="Sign in" />

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
          <Button text="Sign in" onPress={onSignIn} />
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
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "95%",
  },
  view: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  textInput: {
    borderBottomColor: "#FF6066",
    borderBottomWidth: 1,
    width: "70%",
    margin: 16,
    fontSize: 16,
    paddingBottom: 8,
  },
});
