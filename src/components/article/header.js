import { StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../../static/Colors';
import TEXT from '../../static/Text';
import Icon from 'react-native-vector-icons/Feather';
const Header = ({ handleSearch, textChange }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Teman Bumi</Text>
      <View style={styles.inputContainer}>
        <View
          style={{
            resizeMode: 'contain',
            marginLeft: 10,
            position: 'absolute',
          }}
        >
          <Icon
            name='search'
            size={20}
            color={Colors.primary}
            solid
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder='Cari Artikel'
          // keyboardType=''
          autoCapitalize='none'
          onChangeText={textChange}
          onKeyPress={handleSearch}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.lg,
    color: Colors.white,
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 10,
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
});
