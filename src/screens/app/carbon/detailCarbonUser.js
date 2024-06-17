import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import CardCarbon from '../../../components/carbon/card';
import Colors from '../../../static/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../config/apiConfig';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TEXT from '../../../static/Text';

const DetailCarbonUser = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const token = await AsyncStorage.getItem('token');
    const dataStore = await AsyncStorage.getItem('data');
    const dataParse = JSON.parse(dataStore);
    const user_id = dataParse.id;

    axios
      .get(`${API_URL}/getDetailCarbons/${user_id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        const dataArr = Object.values(res.data.data);
        setData(dataArr[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <StatusBar
        style='light'
        backgroundColor={Colors.primary}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.carbonContainer}>
          <Image source={require('../../../../assets/img/co2.png')} />
          <View>
            <Text style={styles.carbonTitle}>Jejak Karbonmu</Text>
            <Text style={styles.carbonValue}>
              {data === undefined || data.length == 0
                ? ''
                : `${data['carbon_footprint']} Kg CO2e`}
            </Text>
          </View>
        </View>
        <Text style={styles.title}>Detail Kegiatanmu</Text>
        {/* Listrik */}
        <CardCarbon
          img={require('../../../../assets/img/icon/carbons/power.png')}
          title='Penggunaan Listrik'
          value={
            data === undefined || data.length == 0
              ? ''
              : `${data['electriccity']} KWh`
          }
        />
        {/* Gas */}
        <CardCarbon
          img={require('../../../../assets/img/icon/carbons/gas.png')}
          title='Penggunaan Gas'
          value={
            data === undefined || data.length == 0 ? '' : `${data['gas']} Liter`
          }
        />
        {/* Transportation */}
        <CardCarbon
          img={require('../../../../assets/img/icon/carbons/car.png')}
          title='Transportasi'
          value={
            data === undefined || data.length == 0
              ? ''
              : `${data['transportation']} KM`
          }
        />
        {/* Food */}
        <CardCarbon
          img={require('../../../../assets/img/icon/carbons/food.png')}
          title='Makanan'
          title2='Jumlah'
          value={
            data === undefined || data.length == 0 ? '' : `${data['food_type']}`
          }
          value2={
            data === undefined || data.length == 0 ? '' : `${data['food']} Kg`
          }
        />
        {/* Organic Waste */}
        <CardCarbon
          img={require('../../../../assets/img/icon/carbons/waste.png')}
          title='Sampah Organik'
          value={
            data === undefined || data.length == 0
              ? ''
              : `${data['organic_waste']} Kg`
          }
        />
        {/* Inorgtanic Waste */}
        <CardCarbon
          img={require('../../../../assets/img/icon/carbons/waste.png')}
          title='Sampah Non-Organik'
          value={
            data === undefined || data.length == 0
              ? ''
              : `${data['inorganic_waste']} Kg`
          }
        />
      </ScrollView>
    </>
  );
};

export default DetailCarbonUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cardGrey,
    marginHorizontal: 20,
  },
  carbonContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 30,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderColor: Colors.borderCard,
    borderWidth: 1.3,
    marginBottom: 15,
    marginTop: 10,
  },
  title: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.sm,
    color: Colors.primary,
    borderBottomColor: Colors.primaryDark,
    borderBottomWidth: 2,
    paddingVertical: 3,
    marginBottom: 5,
    borderRadius: 5,
  },
  carbonTitle: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.sm,
  },
  carbonValue: {
    fontFamily: 'Jakarta-Medium',
    fontSize: TEXT.xsm,
  },
});
