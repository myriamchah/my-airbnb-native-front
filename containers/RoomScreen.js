import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
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
    <SafeAreaView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <RoomInfo room={room} fromShow={true} />
      )}
    </SafeAreaView>
  );
}
