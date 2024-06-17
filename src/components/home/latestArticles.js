import { StyleSheet, Text, View } from 'react-native';
import TEXT from '../../static/Text';
import Colors from '../../static/Colors';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../config/apiConfig';
import ArticleList from '../list/articles';
import axios from 'axios';

const LatestArticle = () => {
  const [data, setData] = useState([]);

  const get = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token != null) {
      await axios
        .get(`${API_URL}/getLatestArticles`, {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    get();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Artikel Terbaru</Text>
      </View>
      <ArticleList data={data} />
    </View>
  );
};

export default LatestArticle;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.xsm,
  },
  link: {
    fontFamily: 'Jakarta-Regular',
    fontSize: TEXT.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.black,
  },
});
