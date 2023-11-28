import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

export default function AroundMeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          showsUserLocation={true}
        />
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
