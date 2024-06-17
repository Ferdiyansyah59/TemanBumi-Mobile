import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArticleList from '../../../components/list/articles';
import { API_URL } from '../../../../config/apiConfig';
import Header from '../../../components/article/header';
import Colors from '../../../static/Colors';

const ArticleScreen = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');

  const textChange = (e) => {
    setTitle(e);
  };

  const handleSearch = async () => {
    const token = await AsyncStorage.getItem('token');
    if (title == '') {
      get(token);
    } else {
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
    }
  };

  const get = async (token) => {
    // const d = JSON.parse(token);
    axios
      .get(`${API_URL}/getAllArticles`, {
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
    handleSearch();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        handleSearch={handleSearch}
        textChange={textChange}
      />
      <View style={{ paddingHorizontal: 20 }}>
        <ArticleList data={data} />
      </View>
    </SafeAreaView>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: 120,
  },
});
