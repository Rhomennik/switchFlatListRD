import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, FlatList, Animated} from 'react-native';

import ListItem, {Separator} from './ListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

const App = () => {
  const [quotes, setQuotes] = useState([
    {id: '0', text: 'Isso e um texto 1'},
    {id: '2', text: 'Isso e um texto 2'},
    {id: '3', text: 'Isso e um texto 3'},
  ]);

  const handleClick = id => {
    setQuotes(quotes.filter(item => item.id !== id));
  };

  return (
    <SafeAreaView styles={styles.container}>
      <FlatList
        data={quotes}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ListItem
            {...item}
            itemStyles={styles.item}
            onSwipeFromLeft={() => alert('Arquivado!')}
            onRightPress={() => handleClick(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </SafeAreaView>
  );
};
export default App;
