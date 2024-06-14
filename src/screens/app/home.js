import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Button, Text, Alert } from 'react-native';
import { API_URL } from '../../../config/apiConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../../config/store';

const Home = () => {
  const authCtx = useContext(AuthContext);
  const [token, setToken] = useState();
  const [data, setData] = useState([]);

  const get = async () => {
    const token = await AsyncStorage.getItem('token');
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
    get();
  }, []);

  const handleLogout = () => {
    authCtx.logout();
  };

  return (
    <SafeAreaView>
      {data.map((i, _) => {
        return <Text>{i.title}</Text>;
      })}
      <Button
        onPress={handleLogout}
        title='logout'
      />
    </SafeAreaView>
  );
};

export default Home;
