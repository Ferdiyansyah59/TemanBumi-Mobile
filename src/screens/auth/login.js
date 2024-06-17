import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenDimensions from '../../static/dimensions';
import Colors from '../../static/Colors';
import TEXT from '../../static/Text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { API_URL } from '../../../config/apiConfig';
import axios from 'axios';
import { errorDialog } from '../../components/dialog/response';
import { AuthContext } from '../../../config/store';
import LoadingOverlay from '../../components/auth/LoadingOverlay';

const WIDTH = ScreenDimensions.width;
const Login = () => {
  const nav = useNavigation();
  // Data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form Validation
  const [emailVal, setEmailVal] = useState(false);
  const [passwordVal, setPasswordVal] = useState(false);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const data = {
    email: email,
    password: password,
  };

  const Login = () => {
    try {
      axios
        .post(`${API_URL}/login`, data)
        .then((res) => {
          setIsAuthenticating(true);
          const id = res.data.data.id;
          const email = res.data.data.email;
          const name = res.data.data.name;
          const data = {
            id: id,
            email: email,
            name: name,
          };
          const token = res.data.data.token;
          authCtx.authenticate(token, data);
        })
        .catch((err) => {
          let msg = err.response;
          let erM = null;
          if (
            msg.data ==
            `{"status":false,"message":"Failed to process request ","error":["Key: 'LoginDTO.Email' Error:Field validation for 'Email' failed on the 'email' tag"],"data":{}}{"status":false,"message":"Please check again yout credential","error":["Invalid credential"],"data":{}}`
          ) {
            erM = 'Format Email Tidak Sesuai';
            errorDialog(erM);
          } else if (msg.data.message == 'Please check again yout credential') {
            erM = 'Email atau Password Salah!';
            errorDialog(erM);
          } else if (msg.data.message == undefined) {
            erM = 'Password minimal 8 karakter!';
            errorDialog(erM);
          }
          setIsAuthenticating(false);
        });
    } catch (err) {
      console.log('Apa nich ', err);
    }
  };

  const formValidation = () => {
    if (email === '') {
      setEmailVal(true);
    }
    if (password === '') {
      setPasswordVal(true);
    }
  };

  const handleLogin = () => {
    formValidation();
    Login();
  };

  if (isAuthenticating) {
    return <LoadingOverlay message='Logging you in...' />;
  }

  return (
    <AlertNotificationRoot>
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.innerContainer}>
          <Image
            style={styles.img}
            source={require('../../../assets/img/login.png')}
          />
          {/* Email */}
          <View
            style={styles.card}
            blurRadius={100}
          >
            <Text style={styles.label}>Email</Text>
            <View
              style={[
                styles.inputContainer,
                emailVal
                  ? {
                      borderColor: Colors.dangerDarker,
                      borderWidth: 1,
                    }
                  : '',
              ]}
            >
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
                onChangeText={(e) => setEmail(e)}
                onKeyPress={() => setEmailVal(false)}
              />
            </View>
            {emailVal ? (
              <Text
                style={{
                  fontSize: TEXT.xxs,
                  color: Colors.dangerDarker,
                  marginLeft: 15,
                }}
              >
                Email tidak boleh kosong!
              </Text>
            ) : (
              ''
            )}
            {/* Passowrd */}
            <Text style={[styles.label, { marginTop: 10 }]}>Password</Text>
            <View
              style={[
                styles.inputContainer,
                passwordVal
                  ? {
                      borderColor: Colors.dangerDarker,
                      borderWidth: 1,
                    }
                  : '',
              ]}
            >
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
                onChangeText={(e) => setPassword(e)}
                onKeyPress={() => setPasswordVal(false)}
              />
            </View>
            {passwordVal ? (
              <Text
                style={{
                  fontSize: TEXT.xxs,
                  color: Colors.dangerDarker,
                  marginLeft: 15,
                }}
              >
                Password tidak boleh kosong!
              </Text>
            ) : (
              ''
            )}
            {/* Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleLogin}
            >
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
    </AlertNotificationRoot>
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
