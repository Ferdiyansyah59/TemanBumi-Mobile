import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../static/Colors';
import TEXT from '../../static/Text';

const Button = ({ cameraPress, galeryPress }) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity
        style={styles.camera}
        activeOpacity={0.85}
        onPress={cameraPress}
      >
        <Text style={styles.title}>Kamera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.gallery}
        activeOpacity={0.85}
        onPress={galeryPress}
      >
        <Text style={styles.title}>Galeri</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  camera: {
    flex: 0.5,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
  },
  gallery: {
    flex: 0.5,
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 8,
  },
  title: {
    color: Colors.white,
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.xsm,
  },
});
