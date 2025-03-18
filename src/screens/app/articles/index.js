import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArticleList from '../../../components/list/articles';
import { API_URL } from '../../../../config/apiConfig';
import Header from '../../../components/article/header';
import Colors from '../../../static/Colors';

const ArticleScreen = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [refreshing, setRefreshing] = useState();

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    handleSearch();
    if (refreshing) {
      handleSearch();
    }
  }, [refreshing]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <Header
          handleSearch={handleSearch}
          textChange={textChange}
        />
        <View style={{ paddingHorizontal: 20 }}>
          <ArticleList data={data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ArticleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingBottom: 120,
  },
});
