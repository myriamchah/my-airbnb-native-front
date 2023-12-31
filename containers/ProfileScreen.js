import { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function ProfileScreen({ setTokenAndId, userToken, userId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState(false);
  const [updatedPic, setUpdatedPic] = useState(false);

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

        setUsername(data.username);
        setEmail(data.email);
        setDescription(data.description);
        data.photo && setPicture(data.photo.url);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const choosePic = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (result.canceled) {
        alert("No picture selected");
      } else {
        setPicture(result.assets[0].uri);
        setUpdatedPic(true);
      }
    } else {
      alert("Permission denied");
    }
  };

  const takePic = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();

      if (result.canceled === true) {
        alert("No picture selected");
      } else {
        setPicture(result.assets[0].uri);
        setUpdatedPic(true);
      }
    } else {
      alert("Permission denied");
    }
  };

  const editProfile = async () => {
    if (updatedInfo || updatedPic) {
      setIsLoading(true);

      if (updatedPic) {
        try {
          let formData;
          const type = picture.split(".").pop();
          formData = new FormData();
          formData.append("photo", {
            uri: picture,
            name: `pic.${type}`,
            type: `image/${type}`,
          });

          const { data } = await axios.put(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture",
            formData,
            {
              headers: {
                Authorization: "Bearer " + userToken,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (data) {
            setPicture(data.photo.url);
            alert("Your photo has been successfully updated");
          } else {
            alert("Oops! An error occurred and your picture wasn't saved.");
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (updatedInfo) {
        try {
          const { data } = await axios.put(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",
            { username, email, description },
            {
              headers: {
                Authorization: "Bearer " + userToken,
              },
            }
          );

          if (data) {
            setUsername(data.username);
            setEmail(data.email);
            setDescription(data.description);
            alert("Your profile has been successfully updated");
          } else {
            alert("Oops! An error occurred and your info weren't saved.");
          }
        } catch (error) {
          console.log(error);
        }
      }

      setIsLoading(false);
      setUpdatedInfo(false);
      setUpdatedPic(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={[styles.view, styles.picView]}>
            <TouchableOpacity>
              {picture ? (
                <Image
                  source={{ uri: picture }}
                  style={styles.picture}
                  resizeMode="cover"
                />
              ) : (
                <Ionicons
                  name="person-circle-outline"
                  size={120}
                  color="grey"
                />
              )}
            </TouchableOpacity>
            <View>
              <TouchableOpacity onPress={choosePic}>
                <Ionicons name="images-outline" size={32} color="grey" />
              </TouchableOpacity>
              <TouchableOpacity onPress={takePic}>
                <Ionicons name="camera-outline" size={32} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.view}>
            <TextInput
              placeholder="email"
              style={styles.textInput}
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                setUpdatedInfo(true);
              }}
            />

            <TextInput
              placeholder="username"
              style={styles.textInput}
              value={username}
              onChangeText={(t) => {
                setUsername(t);
                setUpdatedInfo(true);
              }}
            />

            <TextInput
              placeholder="Describe yourself in a few words..."
              style={[styles.textInput, styles.textArea]}
              multiline={true}
              value={description}
              onChangeText={(t) => {
                setDescription(t);
                setUpdatedInfo(true);
              }}
            />
          </View>
          <Button text="Save changes" onPress={editProfile} />
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
  picView: {
    flexDirection: "row",
    gap: 16,
  },
  picture: {
    height: 120,
    width: 120,
    borderRadius: 60,
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
