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
  const [title, setTitle] = useState('');

  const [titleSet, setTitleSet] = useState(false);
  const setTitleName = (callback) => {
    if (className === 'battery') {
      setTitle('Baterai', callback);
    } else if (className === 'cardboard') {
      setTitle('Kardus', callback);
    } else if (className === 'clothes') {
      setTitle('Pakaian', callback);
    } else if (className === 'glass') {
      setTitle('Beling', callback);
    } else if (className === 'human') {
      setTitle('Ini Teman Anda Bukan Sampah Weeeee!', callback);
    } else if (className === 'metal') {
      setTitle('Logam', callback);
    } else if (className === 'organic') {
      setTitle('Organik', callback);
    } else if (className === 'paper') {
      setTitle('Kertas', callback);
    } else if (className === 'plastic') {
      setTitle('Plastik', callback);
    } else if (className === 'shoes') {
      setTitle('Sepatu', callback);
    } else if (className === 'styrofoam') {
      setTitle('Styrofoam', callback);
    } else {
      setTitle('');
    }

    setTitleSet(true);
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
    setTitleSet(false); // Reset titleSet when className changes
    setTitleName();
  }, [className]);

  useEffect(() => {
    if (titleSet) {
      get();
    }
  }, [titleSet, title]);
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
