import React from 'react';
import {FlatList, Button, StyleSheet, SafeAreaView} from 'react-native';
import ListItem, {Separator} from './ListItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [
        {id: '0', text: 'Isso e um texto 1'},
        {id: '2', text: 'Isso e um texto 2'},
        {id: '3', text: 'Isso e um texto 3'},
      ],
    };
  }

  handleRemove = index => {
    const start = this.state.people.slice(0, index);
    const end = this.state.people.slice(index + 1);
    this.setState({
      people: start.concat(end),
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.people}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <ListItem
              {...item}
              onSwipeFromLeft={() => alert('Arquivado!')}
              onRemove={() => this.handleRemove(index)}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
      </SafeAreaView>
    );
  }
}
