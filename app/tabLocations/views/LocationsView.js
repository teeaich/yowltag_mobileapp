import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { LocationItem } from './LocationItem';

export class LocationsView extends React.Component {

  _renderItem = ({item}) => (
    <LocationItem
      id={item.key}
      data={item.data}
    />
  );

  render() {
    const { locations, recordStatus } = this.props;
    return (
      recordStatus ? (<Text>Record session has been started.</Text>) :
      <FlatList
        data={locations}
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
