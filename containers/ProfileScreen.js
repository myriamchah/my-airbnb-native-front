import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";

import axios from "axios";

export default function ProfileScreen({ setTokenAndId, userToken, userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );

        console.log(data);
        setUsername(data.username);
        setEmail(data.email);
        setDescription(data.description);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.view}>
            <Ionicons name="person-circle-outline" size={80} color="grey" />
          </View>
          <View style={styles.view}>
            <TextInput
              placeholder="email"
              style={styles.textInput}
              value={email}
              onChangeText={(t) => {
                setEmail(t);
              }}
            />

            <TextInput
              placeholder="username"
              style={styles.textInput}
              value={username}
              onChangeText={(t) => {
                setUsername(t);
              }}
            />

            <TextInput
              placeholder="Describe yourself in a few words..."
              style={[styles.textInput, styles.textArea]}
              multiline={true}
              value={description}
              onChangeText={(t) => {
                setDescription(t);
              }}
            />
          </View>
          <Button text="Save changes" />
          <Button
            text="Log out"
            onPress={() => {
              setTokenAndId(null, null);
            }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  textArea: {
    height: 150,
    borderColor: "#FF6066",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
});
