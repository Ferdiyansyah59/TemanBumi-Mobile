import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenDimensions from '../../static/dimensions';
import Colors from '../../static/Colors';
import TEXT from '../../static/Text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { API_URL } from '../../../config/apiConfig';
import axios from 'axios';
import { errorDialog, successDialog } from '../../components/dialog/response';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { useNavigation } from '@react-navigation/native';

const WIDTH = ScreenDimensions.width;

const Register = () => {
  const nav = useNavigation();
  // Data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  // Form Validtaion
  const [nameVal, setNameVal] = useState(false);
  const [emailVal, setEmailVal] = useState(false);
  const [passwordVal, setPasswordVal] = useState(false);
  const [passwordConfirmVal, setPasswordConfirmVal] = useState(false);

  const data = {
    name: name,
    email: email,
    password: password,
  };

  const Register = () => {
    try {
      axios
        .post(`${API_URL}/register`, data)
        .then((res) => {
          successDialog('Registrasi Berhasil!', () => {
            nav.navigate('Login');
          });
        })
        .catch((err) => {
          let msg = err.response.data.error[0];
          let erM = null;
          if (msg == 'Duplicated Email') {
            erM = 'Email Sudah Terdaftar!';
            errorDialog(erM);
          } else if (
            msg ==
            "Key: 'RegisterDTO.Password' Error:Field validation for 'Password' failed on the 'min' tag"
          ) {
            erM = 'Minimal Password 8 Karakter';
            errorDialog(erM);
          } else if (
            msg ==
            `Key: 'RegisterDTO.Email' Error:Field validation for 'Email' failed on the 'email' tag`
          ) {
            erM = 'Format Email Tidak Sesuai';
            errorDialog(erM);
          }
        });
    } catch (err) {
      console.log('Apa nich ', err);
    }
  };

  const formValidation = () => {
    if (name === '') {
      setNameVal(true);
    }
    if (email === '') {
      setEmailVal(true);
    }
    if (password === '') {
      setPasswordVal(true);
    }
    if (passwordConfirm === '') {
      setPasswordConfirmVal(true);
    }
  };

  const handleRegister = () => {
    formValidation();
    if (password != passwordConfirm) {
      errorDialog('Konfirmasi Password Tidak Sesuai');
    } else {
      Register();
    }
  };

  return (
    <AlertNotificationRoot>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.innerContainer}>
          <Image
            style={styles.img}
            source={require('../../../assets/img/register.png')}
          />
          <View
            style={styles.card}
            blurRadius={100}
          >
            {/* Form Nama */}
            <Text style={styles.label}>Nama</Text>
            <View
              style={[
                styles.inputContainer,
                nameVal
                  ? {
                      borderColor: Colors.dangerDarker,
                      borderWidth: 1,
                    }
                  : '',
              ]}
            >
              <View
                style={{
                  resizeMode: 'contain',
                  marginLeft: 10,
                  position: 'absolute',
                }}
              >
                <Icon
                  name='drive-file-rename-outline'
                  size={20}
                  color={Colors.primary}
                  solid
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder='John Doe'
                // keyboardType=''
                autoCapitalize='none'
                onChangeText={(e) => setName(e)}
                onKeyPress={() => setNameVal(false)}
              />
            </View>
            {nameVal ? (
              <Text
                style={{
                  fontSize: TEXT.xxs,
                  color: Colors.dangerDarker,
                  marginLeft: 15,
                }}
              >
                Nama tidak boleh kosong!
              </Text>
            ) : (
              ''
            )}

            {/* Form Email */}
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

            {/* Form Password */}
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
                onChangeText={(e) => setPassword(e)}
                onKeyPress={() => setPasswordVal(false)}
                secureTextEntry={true}
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

            {/* Form Password Confirm */}
            <Text style={[styles.label, { marginTop: 10 }]}>
              Konfirmasi Password
            </Text>
            <View
              style={[
                styles.inputContainer,
                passwordConfirmVal
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
                onChangeText={(e) => setPasswordConfirm(e)}
                onKeyPress={() => setPasswordConfirmVal(false)}
                secureTextEntry={true}
              />
            </View>
            {passwordConfirmVal ? (
              <Text
                style={{
                  fontSize: TEXT.xxs,
                  color: Colors.dangerDarker,
                  marginLeft: 15,
                }}
              >
                Konfirmasi Password tidak boleh kosong!
              </Text>
            ) : (
              ''
            )}
            {/*  Button */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleRegister}
            >
              <View style={styles.btn}>
                <Text style={styles.btnTxt}>Daftar</Text>
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
              marginVertical: 10,
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
      </ScrollView>
    </AlertNotificationRoot>
  );
};

export default Register;

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
    width: WIDTH < 400 ? 150 : WIDTH < 600 ? 200 : 450,
    height: WIDTH < 400 ? 150 : WIDTH < 600 ? 200 : 450,
    alignSelf: 'center',
    marginTop: 50,
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
    left: -5,
    marginTop: WIDTH < 400 ? -100 : WIDTH < 600 ? -200 : -150,
    marginLeft: WIDTH < 400 ? -150 : WIDTH < 600 ? -150 : -150,
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
