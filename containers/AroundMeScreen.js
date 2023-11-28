import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

export default function AroundMeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [userCoords, setUserCoords] = useState([48.8564449, 2.4002913]);

  useEffect(() => {
    const askPermissionAndFetchData = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let data;
      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync();

        const latitude = coords.latitude;
        const longitude = coords.longitude;

        setUserCoords([latitude, longitude]);

        ({ data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${latitude}&longitude=${longitude}`
        ));
      } else {
        ({ data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        ));
      }

      setRooms(data);
      setIsLoading(false);
    };

    askPermissionAndFetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: userCoords[0],
            longitude: userCoords[1],
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={true}
        >
          {rooms.map((room, i) => {
            return (
              <Marker
                onPress={() => {
                  navigation.navigate("Room", {
                    id: room._id,
                  });
                }}
                key={i}
                coordinate={{
                  latitude: room.location[1],
                  longitude: room.location[0],
                }}
              />
            );
          })}
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
    flex: 1,
  },
});
