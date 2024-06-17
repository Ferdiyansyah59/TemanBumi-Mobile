import { FlatList, TouchableOpacity, View } from 'react-native';
import ArticleCard from './card/articles';
import { useNavigation } from '@react-navigation/native';

const ArticleList = ({ data }) => {
  const nav = useNavigation();
  const openArticle = (slug) => {
    nav.navigate('ShowArticle', { slug: slug });
  };

  return (
    <FlatList
      data={data}
      key={(items) => items.id}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          key={index.toString()}
          onPress={() => openArticle(item.slug)}
          activeOpacity={0.9}
        >
          <ArticleCard
            title={item.title}
            date={item.created_At}
            img={item.image}
          />
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ArticleList;
