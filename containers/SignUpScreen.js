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

export default function SignUpScreen({ setTokenAndId, navigation }) {
  const [account, setAccount] = useState({
    email: "",
    username: "",
    description: "",
    password: "",
    confPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onChange = (elem, text) => {
    setAccount((prevState) => ({
      ...prevState,
      [elem]: text,
    }));
    setErrorMessage("");
  };

  const onSignUp = async () => {
    if (
      account.email &&
      account.username &&
      account.description &&
      account.password &&
      account.confPassword
    ) {
      if (account.password === account.confPassword) {
        if (errorMessage) {
          setErrorMessage("");
        }
        try {
          const { data } = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            {
              username: account.username,
              email: account.email,
              description: account.description,
              password: account.password,
            }
          );

          if (data.token && data.id) {
            setTokenAndId(data.token, data.id);
          } else {
            setErrorMessage("An error occurred");
          }
          alert("Account successfully created");
          navigation.navigate("Home");
        } catch (error) {
          console.log(error.response);
          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("Both passwords must be identical.");
      }
    } else {
      setErrorMessage("Please fill in all the blanks.");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
        <HeaderLogo
          text="Sign up"
          style={{
            height: 140,
            width: 140,
          }}
        />

        <View style={styles.view}>
          <TextInput
            placeholder="email"
            style={styles.textInput}
            value={account.email}
            onChangeText={(t) => {
              onChange("email", t);
            }}
          />

          <TextInput
            placeholder="username"
            style={styles.textInput}
            value={account.username}
            onChangeText={(t) => {
              onChange("username", t);
            }}
          />

          <TextInput
            placeholder="Describe yourself in a few words..."
            style={[styles.textInput, styles.textArea]}
            multiline={true}
            value={account.description}
            onChangeText={(t) => {
              onChange("description", t);
            }}
          />

          <TextInput
            placeholder="password"
            style={styles.textInput}
            secureTextEntry={true}
            value={account.password}
            onChangeText={(t) => {
              onChange("password", t);
            }}
          />

          <TextInput
            placeholder="confirm password"
            style={styles.textInput}
            secureTextEntry={true}
            value={account.confPassword}
            onChangeText={(t) => {
              onChange("confPassword", t);
            }}
          />

          <Text color="#FF6066">{errorMessage}</Text>
          <Button text="Sign up" onPress={onSignUp} />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text>Already have an account ? Sign in</Text>
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
    minHeight: "95%",
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
  textArea: {
    height: 150,
    borderColor: "#FF6066",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
});
