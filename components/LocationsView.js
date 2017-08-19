import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LocationItem } from './LocationItem';

export class LocationsView extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Locations',
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons
        name={focused ? 'ios-home' : 'ios-home-outline'}
        size={26}
        style={{ color: tintColor }}
      />
    ),
  };

  _renderItem = ({item}) => (
    <LocationItem
      id={item.key}
      data={item.data}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.screenProps}
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
