import { Text, View } from "react-native";

export default function ProfileScreen({ setTokenAndId, userToken, userId }) {
  return (
    <View>
      <Text>user id : {userId}</Text>
    </View>
  );
}
