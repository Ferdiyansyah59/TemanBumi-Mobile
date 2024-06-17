import { StyleSheet, Text, TextInput } from 'react-native';
import Colors from '../../static/Colors';
import TEXT from '../../static/Text';
import { SelectList } from 'react-native-dropdown-select-list';

const InputForm = ({
  onChangeText,
  placeholder,
  title,
  isFood = false,
  setSelected,
}) => {
  const data = [
    { key: '1', value: 'Daging Sapi' },
    { key: '2', value: 'Daging Ayam' },
    { key: '3', value: 'Ikan' },
    { key: '4', value: 'Susu' },
    { key: '5', value: 'Telur' },
    { key: '6', value: 'Buah' },
    { key: '7', value: 'Kacang' },
  ];
  return (
    <>
      {isFood ? (
        <>
          <Text style={styles.titleTxt}>{title}</Text>
          <SelectList
            setSelected={setSelected}
            data={data}
            save='value'
            search={false}
            boxStyles={styles.inp}
          />
        </>
      ) : (
        ''
      )}
      <Text style={styles.titleTxt}>{title}</Text>
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType='decimal-pad'
        style={styles.inp}
      />
    </>
  );
};

export default InputForm;

const styles = StyleSheet.create({
  inp: {
    backgroundColor: Colors.cardGrey,
    marginTop: 10,
    height: 50,
    paddingLeft: 10,
    borderRadius: 5,
    borderColor: Colors.borderCard,
    borderWidth: 1.2,
    fontFamily: 'Jakarta-Medium',
    color: Colors.primaryDark,
  },
  titleTxt: {
    fontFamily: 'Jakarta-Medium',
    fontSize: TEXT.xsm,
    color: Colors.primaryDark,
    marginTop: 15,
  },
});
