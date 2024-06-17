import { StyleSheet, Text, View } from 'react-native';
import TEXT from '../../static/Text';
import Colors from '../../static/Colors';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ArticleList from '../list/articles';
import axios from 'axios';
import { API_URL } from '../../../config/apiConfig';

const ClassificationArticles = ({ className }) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);

  const setTitleName = () => {
    className === 'battery'
      ? setTitle('Baterai')
      : className === 'cardboard'
      ? setTitle('Kardus')
      : className === 'clothes'
      ? setTitle('Pakaian')
      : className === 'glass'
      ? setTitle('Beling')
      : className === 'human'
      ? setTitle('Ini Teman Anda Bukan Sampah Weeeee!')
      : className === 'metal'
      ? setTitle('Logam')
      : className === 'organic'
      ? setTitle('Organik')
      : className === 'paper'
      ? setTitle('Kertas')
      : className === 'plastic'
      ? setTitle('Plastik')
      : className === 'shoes'
      ? setTitle('Sepatu')
      : className === 'styrofoam'
      ? setTitle('Styrofoam')
      : '';
  };

  const get = async () => {
    const token = await AsyncStorage.getItem('token');
    axios
      .get(`${API_URL}/getArticleWithKey/${title}`, {
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
  };
  useEffect(() => {
    setTitleName();
    get();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Artikel Terkait {title}</Text>
      </View>
      <ArticleList data={data} />
    </View>
  );
};

export default ClassificationArticles;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
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
  undefinedTxt: {
    marginVertical: 10,
  },
});
