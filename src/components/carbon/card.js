import { Image, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import Colors from '../../static/Colors';
import TEXT from '../../static/Text';
const CardCarbon = ({ img, title, value, title2 = null, value2 = null }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.circle}>
          <Image
            style={styles.icon}
            source={img}
          />
        </View>
        <View>
          <Text style={styles.leftTxt}>{title}</Text>
          {title2 != null ? <Text style={styles.leftTxt}>{title2}</Text> : ''}
        </View>
      </View>
      <View>
        <Text style={styles.rightTxt}>{value}</Text>
        {value2 != null ? <Text style={styles.leftTxt}>{value2}</Text> : ''}
      </View>
    </View>
  );
};

export default CardCarbon;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    marginVertical: 3,
    paddingHorizontal: 20,
    paddingVertical: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: Colors.borderCard,
    borderWidth: 1.3,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  circle: {
    height: 50,
    width: 50,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  leftTxt: {
    fontFamily: 'Jakarta-Medium',
    fontSize: TEXT.xsm,
  },
  rightTxt: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.xsm,
  },
});
