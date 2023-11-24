import { AntDesign } from "@expo/vector-icons";
import { ImageBackground, Image, StyleSheet, Text, View } from "react-native";

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

const RoomInfo = ({ room, fromShow }) => {
  return (
    <>
      <ImageBackground
        source={{ uri: room.photos[0].url }}
        style={fromShow ? styles.imageBgShow : styles.imageBgHome}
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
      {fromShow ? <Text style={styles.desc}>{room.description}</Text> : ""}
    </>
  );
};

export default RoomInfo;

const styles = StyleSheet.create({
  imageBgHome: {
    height: 180,
    borderRadius: 4,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  imageBgShow: {
    height: 300,
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
  desc: {
    padding: 8,
  },
});
