import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../static/Colors';
import TEXT from '../../static/Text';
import ScreenDimensions from '../../static/dimensions';
const WIDTH = ScreenDimensions.width;
const Header = ({ name }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Teman Bumi</Text>
      <View style={styles.userCard}>
        <Image
          style={styles.userImg}
          source={require('../../../assets/img/people.png')}
        />
        <View style={styles.txtContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Hi, {name}!</Text>
            <Image
              style={styles.tangan}
              source={require('../../../assets/img/tangan.png')}
            />
          </View>
          <Text
            style={styles.text}
            numberOfLines={2}
          >
            Udah siap jadi teman bumi hari ini?
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingBottom: 20,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  title: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.lg,
    color: Colors.white,
    alignSelf: 'center',
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: WIDTH * 0.9,
    borderRadius: 20,
    marginTop: 10,
    paddingVertical: 20,
  },
  userImg: {
    resizeMode: 'contain',
    flex: 0.3,
    height: WIDTH < 400 ? 50 : WIDTH < 600 ? 60 : 100,
    width: WIDTH < 400 ? 50 : WIDTH < 600 ? 60 : 100,
  },
  txtContainer: {
    flex: 0.8,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  tangan: {
    height: WIDTH < 400 ? 20 : WIDTH < 600 ? 25 : 40,
    width: WIDTH < 400 ? 20 : WIDTH < 600 ? 25 : 40,
  },
  name: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.md,
  },
  text: {
    fontFamily: 'Jakarta-medium',
    fontSize: TEXT.xs,
    color: Colors.naturalDark,
    marginTop: 3,
  },
});
