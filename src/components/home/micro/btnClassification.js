import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../static/Colors';
import TEXT from '../../../static/Text';
import Icon from 'react-native-vector-icons/AntDesign';
const BtnClassification = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Image source={require('../../../../assets/img/garbage.png')} />
        <View style={styles.txtContainer}>
          <Text style={styles.title}>Klasiifikasi Sampah</Text>
          <Text style={styles.desc}>
            Lakukan klasifikasi sampah untuk mengetahui jenis sampah
          </Text>
        </View>
        <Icon
          name='rightcircle'
          size={30}
          color={Colors.primaryDark}
        />
      </View>
    </TouchableOpacity>
  );
};

export default BtnClassification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryLight,
    marginTop: 10,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtContainer: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.xsm,
  },
  desc: {
    fontFamily: 'Jakarta-Regular',
    fontSize: TEXT.xs,
  },
});
