import { ScrollView, StyleSheet, Text } from 'react-native';
import InputForm from '../../../components/carbon/input';
import Colors from '../../../static/Colors';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import { API_URL, AI_API } from '../../../../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { successDialog } from '../../../components/dialog/response';
import { useNavigation } from '@react-navigation/native';
import { AlertNotificationRoot } from 'react-native-alert-notification';

const InputCarbon = ({ route }) => {
  const nav = useNavigation();
  const [loading, setLoading] = useState(false);
  const { onGoBack } = route.params;

  const [elec, setElec] = useState(0.0);
  const [gas, setGas] = useState(0.0);
  const [trans, setTrans] = useState(0.0);
  const [foodT, setFoodT] = useState('Kacang');
  const [food, setFood] = useState(0.0);
  const [organic, setOrganic] = useState(0.0);
  const [inorg, setInorg] = useState(0.0);

  const [isLoading, setIsLoading] = useState(false);

  const [carbonFootprint, setCarbonFootprint] = useState(null);

  const dataPredict = {
    electriccity: elec,
    gas: gas,
    transportation: trans,
    food_type: foodT,
    food: food,
    organic_waste: organic,
    inorganic_waste: inorg,
  };

  const predict = async () => {
    axios
      .post(`${AI_API}/carbons`, dataPredict, {
        headers: {
          Accept: 'application/json, text/plain',
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setCarbonFootprint(res.data.prediksi);
        insertData(res.data.prediksi);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertData = async (carbonFootprint) => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('token');
    const data = await AsyncStorage.getItem('data');
    const userId = JSON.parse(data);
    axios
      .post(
        `${API_URL}/insertCarbons`,
        {
          electriccity: elec,
          gas: gas,
          transportation: trans,
          food_type: foodT,
          food: food,
          organic_waste: organic,
          inorganic_waste: inorg,
          carbon_footprint: carbonFootprint,
          user_id: userId.id,
        },
        {
          headers: {
            Accept: 'application/json, text/plain',
            'Content-Type': 'multipart/form-data',
            Authorization: token,
          },
        },
      )
      .then((res) => {
        setIsLoading(false);
        successDialog(
          `Hari ini, jejak karbonmu adalah ${carbonFootprint} Kg CO2e.  ${
            carbonFootprint > 20 ? 'Melebihi batas normal!' : 'Masih aman, kok!'
          }`,
          () => {
            onGoBack();
            nav.goBack();
          },
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await predict();
      //   }
    } catch (err) {
      console.error(err); // Handle errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertNotificationRoot>
      <StatusBar
        style='light'
        backgroundColor={Colors.primary}
      />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Electric */}
        <InputForm
          placeholder='contoh: 30'
          title='Penggunaan Listrik Harian (KWh)'
          onChangeText={(e) => setElec(e)}
        />
        {/* Gas */}
        <InputForm
          placeholder='contoh: 1'
          title='Penggunaan Gas Harian (Liter)'
          onChangeText={(e) => setGas(e)}
        />
        {/* Transportation */}
        <InputForm
          placeholder='contoh: 20'
          title='Perjalanan Transportasi Harian (KM)'
          onChangeText={(e) => setTrans(e)}
        />
        {/* Food */}
        <InputForm
          placeholder='contoh: 0.3'
          title='Jumlah Makanan Harian (KG)'
          onChangeText={(e) => setFood(e)}
          isFood={true}
          setSelected={(val) => setFoodT(val)}
        />

        {/* Transportation */}
        <InputForm
          placeholder='contoh: 0.2'
          title='Jumlah Sampah Organik Harian (KG)'
          onChangeText={(e) => setOrganic(e)}
        />
        <InputForm
          placeholder='contoh: 0.3'
          title='Jumlah Sampah Non-Organik Harian (KG)'
          onChangeText={(e) => setInorg(e)}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={handleSave}
        >
          <Text style={styles.btnTxt}>
            {isLoading ? 'Loading...' : 'Simpan'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </AlertNotificationRoot>
  );
};

export default InputCarbon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 20,
  },
  btn: {
    backgroundColor: Colors.primary,
    marginVertical: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  btnTxt: {
    textAlign: 'center',
    fontFamily: 'Jakarta-Medium',
    color: Colors.white,
  },
});
