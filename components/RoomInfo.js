import { ImageBackground, Image, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Swiper from "react-native-swiper";

const displayStars = (value) => {
  const stars = [];
  for (i = 1; i <= 5; i++) {
    if (i <= value) {
      stars.push(<AntDesign name="star" size={14} color="#FFB102" key={i} />);
    } else {
      stars.push(<AntDesign name="star" size={14} color="lightgrey" key={i} />);
    }
  }
  return stars;
};

const RoomInfo = ({ room, fromShow }) => {
  return (
    <>
      <Swiper
        autoplay={fromShow}
        showsPagination={false}
        style={styles.swiperWrapper(fromShow)}
      >
        {room.photos.map((photo) => (
          <ImageBackground
            source={{ uri: photo.url }}
            style={[
              fromShow ? styles.imageBgShow : styles.imageBgHome,
              styles.swiperSlide,
            ]}
            key={photo.picture_id}
          >
            <Text style={styles.price}>{room.price} € </Text>
          </ImageBackground>
        ))}
      </Swiper>
      <View style={styles.infoView}>
        <View>
          <Text style={styles.title}>{room.title}</Text>
          <View style={styles.stars}>
            {displayStars(room.ratingValue)}
            <Text style={styles.legend}> {room.reviews} reviews</Text>
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
    paddingVertical: 4,
    alignItems: "center",
  },
  legend: {
    fontSize: 12,
    color: "grey",
  },
  desc: {
    padding: 8,
  },
  swiperWrapper: (fromShow) => ({
    height: fromShow ? 240 : 180,
    borderRadius: fromShow ? 0 : 4,
  }),
  swiperSlide: {
    flex: 1,
  },
});
