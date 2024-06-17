import { Image, StyleSheet, Text, View } from 'react-native';
import Colors from '../../../static/Colors';
import TEXT from '../../../static/Text';
import ScreenDimensions from '../../../static/dimensions';

const WIDTH = ScreenDimensions.width;
const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tentang Aplikasi Teman Bumi</Text>
      <Image
        style={styles.img}
        source={require('../../../../assets/img/HeroImage.png')}
      />
      <Text style={styles.desc}>
        Aplikasi teman bumi adalah aplikasi yang bertujuan untuk mengajak
        masyarakat untuk menjadi teman yang baik untuk bumi. Cara yang bisa
        dilakukan untuk menjadi teman yang baik untuk bumi adalah menjaga
        lingkungan dari hal sekecil mungkin, seperti membuang sampah pada
        tempatnya.
      </Text>
      <Text style={styles.foot}>Teman Bumi Created By Ferdiyansyah</Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  img: {
    alignSelf: 'center',
    width: WIDTH * 0.8,
    height: WIDTH * 0.7,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.sm,
  },
  desc: {
    marginTop: 10,
    fontFamily: 'Jakarta-Regular',
    fontSize: TEXT.xsm,
    textAlign: 'justify',
  },
  foot: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.xsm,
  },
});
