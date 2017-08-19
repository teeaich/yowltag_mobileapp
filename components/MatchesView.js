import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LocationItem } from './LocationItem';

export class MatchesView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Matches',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-people' : 'ios-people-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  };

  _renderItem = ({item}) => (
    <Text>Jo</Text>
  );

  render() {
    return (
      <FlatList
        data={this.props.locations}
        renderItem={this._renderItem}/>
    )
  }
}

const styles = StyleSheet.create({
  locationItem: {
    padding: 10,
    backgroundColor: 'gray',
    borderTopWidth: 1,
    borderTopColor: 'white',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  locationItemBlock: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 10,
    height: 10,
    color: 'white'
  }
});
