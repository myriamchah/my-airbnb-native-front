import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";

import RoomInfo from "../components/RoomInfo";

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
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView style={styles.scrollView}>
          <View style={{ height: 400 }}>
            <RoomInfo room={room} fromShow={true} />
          </View>
          <MapView
            style={styles.mapView}
            initialRegion={{
              latitude: room.location[1],
              longitude: room.location[0],
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={{
                latitude: room.location[1],
                longitude: room.location[0],
              }}
              title={room.title}
            />
          </MapView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "white",
    flex: 1,
  },
  mapView: {
    height: "100%",
  },
});
