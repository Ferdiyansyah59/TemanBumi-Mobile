import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenDimensions from '../../static/dimensions';
import Colors from '../../static/Colors';
import TEXT from '../../static/Text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const WIDTH = ScreenDimensions.width;
const HEIGHT = ScreenDimensions.height;
const Login = () => {
  return (
    <>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.innerContainer}>
          <Image
            style={styles.img}
            source={require('../../../assets/img/login.png')}
          />
          <View style={styles.card}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Image
                style={{
                  resizeMode: 'contain',
                  marginLeft: 10,
                  position: 'absolute',
                }}
                source={require('../../../assets/img/icon/Email.png')}
              />
              <TextInput
                style={styles.input}
                placeholder='example@example.com'
                keyboardType='email-address'
                autoCapitalize='none'
              />
            </View>
            <Text style={[styles.label, { marginTop: 10 }]}>Password</Text>
            <View style={styles.inputContainer}>
              <Image
                style={{
                  resizeMode: 'contain',
                  marginLeft: 10,
                  position: 'absolute',
                }}
                source={require('../../../assets/img/icon/key.png')}
              />
              <TextInput
                style={styles.input}
                placeholder='*************'
                keyboardType='default'
                autoCapitalize='none'
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity activeOpacity={0.85}>
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>Masuk</Text>
                <Image
                  style={{
                    resizeMode: 'contain',
                    height: 25,
                  }}
                  source={require('../../../assets/img/icon/btn-login.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: 'Jakarta-Bold',
              color: Colors.primaryDark,
              marginTop: 10,
              fontSize: TEXT.lg,
            }}
          >
            Teman Bumi
          </Text>
        </View>
        <Image
          style={styles.gimikAtas}
          source={require('../../../assets/img/gimik-atas.png')}
        />
        <Image
          style={styles.gimikBawah}
          source={require('../../../assets/img/gimik-bawah.png')}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    // marginTop: -100,
  },
  img: {
    zIndex: 1, // works on ios
    elevation: 1, // works on android
    resizeMode: 'contain',
    width: WIDTH < 400 ? 150 : WIDTH < 600 ? 370 : 450,
    height: WIDTH < 400 ? 150 : WIDTH < 600 ? 370 : 450,
    alignSelf: 'center',
    marginBottom: -70,
  },
  card: {
    marginHorizontal: WIDTH * 0.08,
    backgroundColor: '#B4DCB78C',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 30,
    zIndex: 2,
    shadowColor: '#FFFFFF',
    elevation: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#A8D6AD',
    borderRadius: 100,
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    height: 55,
    width: '100%',
    paddingLeft: 35,
    color: Colors.primary,
    fontSize: TEXT.sm,
    marginTop: -5,
    fontFamily: 'Jakarta-Medium',
  },
  label: {
    color: Colors.primaryDark,
    fontSize: TEXT.sm,
    marginBottom: 5,
    marginLeft: 15,
    fontFamily: 'Jakarta-SemiBold',
  },
  btn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
    paddingVertical: 10,
    width: WIDTH * 0.5,
    marginBottom: 10,
  },
  btnTxt: {
    color: Colors.white,
    fontFamily: 'Jakarta-SemiBold',
  },
  gimikAtas: {
    position: 'absolute',
    top: -5,
    right: -5,
    marginTop: WIDTH < 400 ? -100 : WIDTH < 600 ? -200 : -150,
    marginRight: WIDTH < 400 ? -150 : WIDTH < 600 ? -150 : -150,
    width: WIDTH < 400 ? 150 : WIDTH < 600 ? 500 : 450,
    height: WIDTH < 400 ? 150 : WIDTH < 600 ? 500 : 450,
    resizeMode: 'contain',
    zIndex: 0, // works on ios
    elevation: 0, // works on android
  },

  gimikBawah: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: WIDTH < 400 ? -100 : WIDTH < 600 ? -250 : -150,
    width: WIDTH < 400 ? 150 : WIDTH < 600 ? 700 : 450,
    height: WIDTH < 400 ? 150 : WIDTH < 600 ? 700 : 450,
    zIndex: 0, // works on ios
    elevation: 0, // works on android
  },
});
