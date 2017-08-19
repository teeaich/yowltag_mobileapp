import React from 'react'
import { View, Text, TouchableOpacity, AlertIOS} from 'react-native';
import { Container, Header, Content, Body, Title, Left, Right, Button, Icon } from 'native-base'
import { LocationsView } from './LocationsView';
import BackgroundGeolocation from 'react-native-background-geolocation';
import moment from 'moment';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';


class TabLocationsHomescreen extends React.Component {
  componentWillMount() {
    // 1.  Wire up event-listeners

    // This handler fires whenever bgGeo receives a location update.
    BackgroundGeolocation.on('location', this.onLocation);

    // This handler fires whenever bgGeo receives an error
    BackgroundGeolocation.on('error', this.onError);

    // This handler fires when movement states changes (stationary->moving; moving->stationary)
    BackgroundGeolocation.on('motionchange', this.onMotionChange);

    // This event fires when a chnage in motion activity is detected
    BackgroundGeolocation.on('activitychange', this.onActivityChange);

    // This event fires when the user toggles location-services
    BackgroundGeolocation.on('providerchange', this.onProviderChange);

    // 2.  #configure the plugin (just once for life-time of app)
    BackgroundGeolocation.configure(this.props.backgroundGeolocationState, (state) => {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function () {
          console.log("- Start success");
        });
      }
    });
  }

  // You must remove listeners when your component unmounts
  componentWillUnmount() {
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', this.onLocation);
    BackgroundGeolocation.un('error', this.onError);
    BackgroundGeolocation.un('motionchange', this.onMotionChange);
    BackgroundGeolocation.un('activitychange', this.onActivityChange);
    BackgroundGeolocation.un('providerchange', this.onProviderChange);
  }

  onLocation = (location) => {
    console.log('- [js]location: ', location);
    const locationEnhanced = location;
    const currentTimeAsString = moment().format('D.MM.YYYY HH:mm:ss');
    locationEnhanced.time = currentTimeAsString;
    if (this.props.backgroundGeolocationState.recordEnabled) {
      this.props.createRecorddata({key: location.uuid, data: location});
    } else {
      this.props.addLocationToServer({key: location.uuid, data: location});
    }
  };

  onError = (error) => {
    var type = error.type;
    var code = error.code;
    alert(type + " Error: " + code);
  };

  onActivityChange = (activityName) => {
    console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
  };

  onProviderChange = (provider) => {

    console.log('- Location provider changed: ', provider.enabled);
  };

  onMotionChange = (location) => {
    console.log('- [js]motionchanged: ', JSON.stringify(location));
  };

  toggleLocationRecord = () => {
    if (this.props.backgroundGeolocationState.recordEnabled) {
      this.props.stopRecorddata()
    } else {
      AlertIOS.prompt(
        'Enter a record name',
        null,
        text => this.props.createRecord(text)
      );
    }
  };

  render() {
    const {locations, backgroundGeolocationState, navigation } = this.props;
    return (
      <Container style={{
        flex:1
      }}>
        <Header>
          <Left>
            <Button transparent onPress={ () => navigation.navigate('TabLocationsSettings') }>
              <Icon name='settings'/>
            </Button>
          </Left>
          <Body>
          <Title>Locations</Title>
          </Body>
          <Right>
            <Button transparent onPress={ this.toggleLocationRecord }>
              <Icon name={backgroundGeolocationState.recordEnabled ? 'stopwatch' : 'play'}/>
            </Button>
          </Right>
        </Header>
        <Content padder>
          <LocationsView locations={locations.locationsData} recordStatus={backgroundGeolocationState.recordEnabled}></LocationsView>
        </Content>
      </Container>
    )
  }
}
const mapStateToProps = state => ({
  backgroundGeolocationState: state.backgroundGeolocationState,
  locations: state.locations
});

const mapDispatchToProps = (dispatch) => ({
  addLocation: (payload) => {
    dispatch({type: 'ADD_LOCATION', payload})
  },
  resetLocations: () => {
    dispatch({type: 'RESET_LOCATIONS'})
  },
  startRecorddata: (payload) => {
    dispatch({type: 'START_RECORDDATA', payload})
  },
  stopRecorddata: () => {
    dispatch({type: 'STOP_RECORDDATA'})
  }
});

const CREATE_LOCATION_MUTATION = gql`
      mutation createLocation($user: String!, $lat: Float!, $long: Float!) {
        createLocation(user: $user, lat: $lat, long: $long) {
          hash_key
          range_key
          long
          lat
          timestamp,
        }
      }
      `;

const withCreateLocationMutation = graphql(CREATE_LOCATION_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    addLocationToServer({key, data}) {
      return mutate({
        variables: {
          user: "93f4fe90-4e01-11e7-98de-db86d3572b09",
          lat: data.coords.latitude,
          long: data.coords.longitude,
        }
      })
        .then(result => {
          console.log(result);
          ownProps.addLocation({key, data});
        })
        .catch(error => {
          console.log(error);
        })
    }
  })
});

const CREATE_RECORD_MUTATION = gql`
      mutation createRecord($user: String!, $name: String!) {
        createRecord(user: $user, name: $name) {
          id
          name
          timestamp
        }
      }
      `;

const withCreateRecordMutation = graphql(CREATE_RECORD_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createRecord(name) {
      return mutate({
        variables: {
          user: "93f4fe90-4e01-11e7-98de-db86d3572b09",
          name: name
        }
      })
        .then(({data}) => {
          ownProps.startRecorddata(data.createRecord);
        })
        .catch(error => {
          console.log(error);
        })
    }
  })
});


const CREATE_RECORDDATA_MUTATION = gql`
      mutation createRecorddata($recordId: String!, $lat: Float!, $long: Float!, $dataObject: String!, $bgGeoConfig: String!) {
        createRecorddata(recordId: $recordId, lat: $lat, long: $long, dataObject: $dataObject, bgGeoConfig: $bgGeoConfig) {
          id
          recordId
          lat
          long
          timestamp
        }
      }
      `;

const withCreateRecorddataMutation = graphql(CREATE_RECORDDATA_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    createRecorddata({key, data}) {
      return mutate({
        variables: {
          recordId: ownProps.backgroundGeolocationState.recordName,
          lat: data.coords.latitude,
          long: data.coords.longitude,
          dataObject: JSON.stringify(data),
          bgGeoConfig: JSON.stringify(ownProps.backgroundGeolocationState),
        }
      })
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
        })
    }
  })
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withCreateLocationMutation,
  withCreateRecordMutation,
  withCreateRecorddataMutation
)(TabLocationsHomescreen);

