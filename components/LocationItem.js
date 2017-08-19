import React from 'react';
import { StyleSheet, View, Text} from 'react-native';

export class LocationItem extends React.PureComponent {

  render() {
    return (
      <View style={styles.locationItem}>
        <View style={styles.locationItemBlock}>
          <Text style={styles.item}>Longitude: {this.props.data.coords.longitude}</Text>
          <Text style={styles.item}>Latitude: {this.props.data.coords.latitude}</Text>
          <Text style={styles.item}>Speed: {this.props.data.coords.speed}</Text>
          <Text style={styles.item}>is moving: {this.props.data.is_moving}</Text>
        </View>
        <View style={styles.locationItemBlock}>
          <Text style={styles.item}>Time: {this.props.data.time}</Text>
        </View>
      </View>

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
