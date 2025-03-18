import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../../config/store';
import Colors from '../../static/Colors';
import { StatusBar } from 'expo-status-bar';
import ScreenDimensions from '../../static/dimensions';
import Header from '../../components/home/header';
import Middle from '../../components/home/middle';
import LatestArticle from '../../components/home/latestArticles';
const WIDTH = ScreenDimensions.width;
const Home = () => {
  const authCtx = useContext(AuthContext);
  const [name, setName] = useState();

  const [refreshing, setRefreshing] = useState();

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {/* Middle */}
        <Middle />

        {/* Article */}
        <LatestArticle
          onReload={() => onRefresh()}
          isRefreshing={refreshing}
        />
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
