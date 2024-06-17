import { StyleSheet, Text, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import ScreenDimensions from '../../../static/dimensions';
const WIDTH = ScreenDimensions.width;
const CardOutput = ({ value, title }) => {
  const htmlContent = `<p><a href="http://jsdf.co">&hearts; nice job!</a></p>`;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <RenderHtml
        contentWidth={WIDTH}
        source={{ html: value }}
      />
    </View>
  );
};

export default CardOutput;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderColor: '#8B9E70',
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Jakarta-SemiBold',
  },
  ol: {
    textAlign: 'left',
  },
});
