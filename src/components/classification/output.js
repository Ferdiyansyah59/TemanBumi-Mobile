import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../static/Colors';
import TEXT from '../../static/Text';
import ClassOutput from './micro/classOutput';
import ClassificationArticles from './article';
import { useEffect, useState } from 'react';

const ClassificationOutput = ({ className }) => {
  const [showArticles, setShowArticles] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowArticles(true);
    }, 1500);
  });
  return (
    <View style={styles.container}>
      {className != null ? (
        <View>
          <View style={styles.resContainer}>
            <Text style={styles.res}>
              {className == null ? '' : className !== 'human' ? 'Sampah' : ''}{' '}
              {className === 'battery'
                ? 'Baterai'
                : className === 'cardboard'
                ? 'Kardus'
                : className === 'clothes'
                ? 'Pakaian'
                : className === 'glass'
                ? 'Beling'
                : className === 'human'
                ? 'Ini Teman Anda Bukan Sampah Weeeee!'
                : className === 'metal'
                ? 'Logam'
                : className === 'organic'
                ? 'Organik'
                : className === 'paper'
                ? 'Kertas'
                : className === 'plastic'
                ? 'Plastik'
                : className === 'shoes'
                ? 'Sepatu'
                : className === 'styrofoam'
                ? 'Styrofoam'
                : ''}
            </Text>
          </View>
          <ClassOutput predict={className} />
          {showArticles && <ClassificationArticles className={className} />}
        </View>
      ) : (
        ''
      )}
    </View>
  );
};

export default ClassificationOutput;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingBottom: 30,
  },
  resContainer: {
    backgroundColor: Colors.primaryLight,
    padding: 10,
  },
  res: {
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.sm,
    color: Colors.primaryDark,
  },
});
