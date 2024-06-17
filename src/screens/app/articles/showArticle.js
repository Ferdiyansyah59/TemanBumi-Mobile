import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { API_URL, ARTICLE_IMAGE } from '../../../../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../../static/Colors';
import TEXT from '../../../static/Text';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ScreenDimensions from '../../../static/dimensions';
import Constants from 'expo-constants';
import RenderHtml from 'react-native-render-html';
const WIDTH = ScreenDimensions.width;
const ShowArticle = () => {
  const route = useRoute();
  const slug = route.params.slug;

  const [data, setData] = useState([]);

  const get = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token != null) {
        await axios
          .get(`${API_URL}/showArticle/${slug}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => {
            setData(res.data.data[0]);
          })
          .catch((err) => {
            console.log('Apakah disini? ', err);
          });
      }
    } catch (err) {
      console.log('Disini ', err);
    }
  };
  useEffect(() => {
    get();
  }, []);

  const dateFormat = (timestamp) => {
    let date = new Date(timestamp);

    // Ambil hari, bulan, dan tahun dari objek Date
    let day = date.getDate();
    let month = date.getMonth() + 1; // getMonth() mengembalikan bulan dari 0-11, jadi tambahkan 1
    let year = date.getFullYear();

    // Formatkan hari dan bulan agar selalu dua digit
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Gabungkan ke dalam format DD-MM-YYYY
    return `${day}-${month}-${year}`;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{data['title']}</Text>
      <View style={styles.dateContainer}>
        <Fontisto
          name='date'
          color={Colors.naturalDark}
        />
        <Text style={styles.date}>{dateFormat(data['created_At'])}</Text>
      </View>
      <Image
        style={styles.img}
        source={{ uri: ARTICLE_IMAGE + data['image'] }}
      />
      {/* <HtmlView value={data['description']} /> */}
      {/* <Text>{data['description']}</Text> */}
      <RenderHtml
        contentWidth={WIDTH}
        source={{ html: data['description'] }}
      />
      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

export default ShowArticle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.sm,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 10,
  },
  date: {
    fontFamily: 'Jakarta-Regular',
    color: Colors.naturalDark,
    fontSize: TEXT.xxs,
    marginTop: 2,
  },
  img: {
    width: '100%',
    height: WIDTH < 400 ? 150 : WIDTH < 600 ? 200 : 450,
    marginTop: 5,
  },
  containerWeb: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
