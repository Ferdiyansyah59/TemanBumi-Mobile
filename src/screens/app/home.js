import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Text,
  Alert,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { API_URL } from '../../../config/apiConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../../config/store';
import ArticleCard from '../../components/list/card/articles';
import ArticleList from '../../components/list/articles';
import Colors from '../../static/Colors';
import { StatusBar } from 'expo-status-bar';
import TEXT from '../../static/Text';
import ScreenDimensions from '../../static/dimensions';
import Header from '../../components/home/header';
import Middle from '../../components/home/middle';
import LatestArticle from '../../components/home/latestArticles';
import { NativeModules } from 'react-native';
const WIDTH = ScreenDimensions.width;
const Home = () => {
  const authCtx = useContext(AuthContext);
  const [token, setToken] = useState();
  const [data, setData] = useState([]);
  const [name, setName] = useState();

  const getDataStorage = async () => {
    const data = await AsyncStorage.getItem('data');
    const d = JSON.parse(data);
    setName(d.name);
  };

  useEffect(() => {
    getDataStorage();
  }, []);
  const handleLogout = () => {
    authCtx.logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Button
        title='coba'
        onPress={() => NativeModules.DevSettings.reload()}
      /> */}
      <StatusBar
        style='light'
        backgroundColor={Colors.primary}
      />
      {/* Header */}
      <Header name={name} />
      <ScrollView>
        {/* Middle */}
        <Middle />

        {/* Article */}
        <LatestArticle />
        <View style={{ height: 20 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
