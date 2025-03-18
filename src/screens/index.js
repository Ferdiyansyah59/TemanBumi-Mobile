import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenDimensions from '../static/dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../static/Colors';
import TEXT from '../static/Text';
import { useNavigation } from '@react-navigation/native';

const WIDTH = ScreenDimensions.width;
function Index() {
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.imgCOntainer}>
          <Image
            style={styles.img}
            source={require('../../assets/img/onboarding.png')}
          />
          <View style={styles.desc}>
            <Text
              style={{
                fontFamily: 'Jakarta-SemiBold',
                color: Colors.primary,
                fontSize: TEXT.md,
              }}
            >
              Hi, Teman Bumi
            </Text>
            <Text
              style={{
                fontFamily: 'Jakarta-Medium',
                color: Colors.naturalDark,
                fontSize: TEXT.xs,
              }}
            >
              Mari kita jadi teman yang baik untuk bumi
            </Text>
          </View>
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('Login')}
          >
            <View style={styles.btn}>
              <Text style={styles.btnTxt}>Mulai</Text>
            </View>
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Jakarta-Regular', fontSize: TEXT.xs }}>
            Powered By{' '}
            <Text
              style={{
                fontFamily: 'Jakarta-Bold',
                color: Colors.primary,
                fontSize: TEXT.sm,
              }}
            >
              Teman Bumi
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
}

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingHorizontal: WIDTH * 0.08,
    flexDirection: 'column',
  },
  imgCOntainer: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: WIDTH * 0.1,
  },
  desc: {
    marginTop: 50,
    alignSelf: 'flex-start',
    // paddingLeft: 20,
  },
  img: {
    width: WIDTH < 400 ? 250 : WIDTH < 600 ? 350 : 400,
    height: WIDTH < 400 ? 250 : WIDTH < 600 ? 350 : 400,
    resizeMode: 'contain',
  },
  btn: {
    backgroundColor: Colors.primary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    width: WIDTH * 0.8,
    marginBottom: 10,
  },
  btnTxt: {
    color: Colors.white,
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.sm,
  },
  btnContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
