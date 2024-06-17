import { useEffect, useState } from 'react';
import CardOutput from './cardOutput';
import { predictData } from '../../../../data/predict';
import { View } from 'react-native';

const ClassOutput = ({ predict }) => {
  const [daur, setDaur] = useState();
  const [buang, setBuang] = useState();
  const [positif, setPositif] = useState();
  const [negatif, setNegatif] = useState();
  useEffect(() => {
    if (predict == 'human') {
      setDaur('');
      setBuang('');
      setPositif('');
      setNegatif('');
    } else {
      setDaur(predictData[predict].daurUlang);
      setBuang(predictData[predict].caraBuang);
      setPositif(predictData[predict].positif);
      setNegatif(predictData[predict].negatif);
    }
  });

  return (
    <View>
      <CardOutput
        value={daur}
        title='Daur Ulang'
      />
      <CardOutput
        value={buang}
        title='Cara Buang'
      />
      <CardOutput
        value={positif}
        title='Dampak Positif'
      />
      <CardOutput
        value={negatif}
        title='Dampak Negatif'
      />
    </View>
  );
};

export default ClassOutput;
