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
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

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

  const displayStars = (value) => {
    const stars = [];
    for (i = 0; i <= value; i++) {
      if (i <= value) {
        stars.push(<AntDesign name="star" size={14} color="#FFB102" key={i} />);
      } else {
        stars.push(<AntDesign name="star" size={14} color="grey" key={i} />);
      }
    }
    return stars;
  };

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
              <ImageBackground
                source={{ uri: item.photos[0].url }}
                style={styles.imageBg}
              >
                <Text style={styles.price}>{item.price}€ </Text>
              </ImageBackground>

              <View style={styles.infoView}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.stars}>
                    {displayStars(item.ratingValue)}
                    <Text style={styles.legend}>{item.reviews} reviews</Text>
                  </View>
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
  stars: {
    flexDirection: "row",
  },
  legend: {
    fontSize: 12,
    color: "grey",
  },
});
