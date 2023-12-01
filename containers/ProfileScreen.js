import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Text,
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
        <ScrollView>
          <View>
            <Ionicons name="person-circle-outline" size={80} color="grey" />
          </View>
        </ScrollView>
      )}
      <Button
        text="Log out"
        onPress={() => {
          setTokenAndId(null, null);
        }}
      />
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
});
