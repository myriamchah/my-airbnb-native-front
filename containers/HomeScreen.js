import { useNavigation } from "@react-navigation/core";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import axios from "axios";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <FlatList
          data={rooms}
          keyExtractor={(room) => room._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
              }}
            >
              <View>
                <ImageBackground
                  source={{ uri: item.photos[0].url }}
                  style={styles.imageBg}
                >
                  <Text style={styles.price}>{item.price}€ </Text>
                </ImageBackground>
              </View>
              <View style={styles.infoView}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text>{item.ratingValue}</Text>
                </View>
                <View>
                  <Image
                    source={{ uri: item.user.account.photo.url }}
                    style={styles.avatar}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
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
  imageBg: {
    height: 180,
    borderRadius: 4,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  infoView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  price: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    margin: 8,
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 2,
    textShadowColor: "black",
  },
});
