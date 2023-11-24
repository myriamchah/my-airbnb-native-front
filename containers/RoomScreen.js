import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import axios from "axios";

export default function RoomScreen({ route }) {
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${route.params.id}`
        );
        setRoom(data);
        console.log(room);
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
    <SafeAreaView>
      <ImageBackground
        source={{ uri: room.photos[0].url }}
        style={styles.imageBg}
      >
        <Text style={styles.price}>{room.price}€ </Text>
      </ImageBackground>

      <View style={styles.infoView}>
        <View>
          <Text style={styles.title}>{room.title}</Text>
          <View style={styles.stars}>
            {displayStars(room.ratingValue)}
            <Text style={styles.legend}>{room.reviews} reviews</Text>
          </View>
        </View>
        <View>
          <Image
            source={{ uri: room.user.account.photo.url }}
            style={styles.avatar}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
