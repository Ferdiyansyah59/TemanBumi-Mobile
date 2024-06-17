import { Image, StyleSheet, Text, View } from 'react-native';
import ScreenDimensions from '../../../static/dimensions';
import Colors from '../../../static/Colors';
import TEXT from '../../../static/Text';
import { ARTICLE_IMAGE } from '../../../../config/apiConfig';
const WIDTH = ScreenDimensions.width;
const ArticleCard = ({ title, date, img }) => {
  const dateFormat = (timestamp) => {
    let date = new Date(timestamp);

    // Ambil hari, bulan, dan tahun dari objek Date
    let day = date.getDate();
    let month = date.getMonth() + 1; // getMonth() mengembalikan bulan dari 0-11, jadi tambahkan 1
    let year = date.getFullYear();

    // Formatkan hari dan bulan agar selalu dua digit
    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    // Gabungkan ke dalam format DD-MM-YYYY
    return `${day}-${month}-${year}`;
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{ uri: ARTICLE_IMAGE + img }}
      />
      <View style={styles.txtContainer}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text style={styles.date}>{dateFormat(date)}</Text>
      </View>
    </View>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },
  txtContainer: {
    paddingHorizontal: 10,
    width: '85%',
    flex: 0.8,
  },
  img: {
    resizeMode: 'cover',
    flex: 0.4,
    height: WIDTH < 400 ? 70 : WIDTH < 600 ? 100 : 170,
    width: WIDTH < 400 ? 70 : WIDTH < 600 ? 100 : 170,
  },
  title: {
    fontSize: TEXT.xsm,
    fontFamily: 'Jakarta-SemiBold',
  },
  date: {
    fontFamily: 'Jakarta-Regular',
    color: Colors.naturalDark,
    fontSize: TEXT.xxs,
    marginTop: 2,
  },
});
