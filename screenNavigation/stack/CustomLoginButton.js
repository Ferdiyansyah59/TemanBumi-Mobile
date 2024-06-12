import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../src/static/Colors';
import TEXT from '../../src/static/Text';

function CustomLoginButton() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.masuk}>
          <Text style={styles.masukTxt}>Masuk</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View
          style={{
            paddingRight: 7,
          }}
        >
          <Text
            style={{
              fontFamily: 'Jakarta-Medium',
              marginTop: -4,
              color: Colors.primaryDark,
            }}
          >
            Daftar
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CustomLoginButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderColor: Colors.primaryDark,
    borderWidth: 1.5,
    padding: 3,

    borderRadius: 100,
    backgroundColor: Colors.white,
  },
  masuk: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 100,
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
  masukTxt: {
    color: Colors.white,
    fontFamily: 'Jakarta-Medium',
    fontSize: TEXT.sm,
    marginTop: -4,
  },
});
