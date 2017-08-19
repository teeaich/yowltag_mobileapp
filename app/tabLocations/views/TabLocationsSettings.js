import React from 'react';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { Slider, View, StyleSheet } from 'react-native';
import { Container, List, Content, Button, Header, ListItem, Radio, Body, Title, Text, Icon, Right, Left} from 'native-base';
import { graphql, compose } from 'react-apollo';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import gql from 'graphql-tag';

class TabLocationsSettings extends React.Component {

  constructor(props) {
    super(props);
    this.state = { backgroundState: ''};
    BackgroundGeolocation.getState(state =>
      this.setState((prevState, props) => ({ backgroundState: state })))
  }

  goBackToHomescreen = () => {
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction)
  };

  handleOption(configType, type, currentValue) {
    BackgroundGeolocation.setConfig({
      [configType]: type === 'bool' ? !currentValue : currentValue
    }, (config) => {
      this.props.addBgState(config);
      console.log("- setConfig success");
    }, () => {
      console.warn("- Failed to setConfig");
    });
  }

  handleOptionDistanceFilter = (value) => {
    BackgroundGeolocation.setConfig({
      distanceFilter: value
    }, (config) => {
      this.props.addBgState(config);
      console.log("- setConfig success");
    }, () => {
      console.warn("- Failed to setConfig");
    });
  };

  handleOptionDesiredOdometerAccuracy = (value) => {
    BackgroundGeolocation.setConfig({
      desiredOdometerAccuracy: value
    }, (config) => {
      this.props.addBgState(config);
      console.log("- setConfig success");
    }, () => {
      console.warn("- Failed to setConfig");
    });
  };

  handleOptionStationaryRadius = (value) => {
    BackgroundGeolocation.setConfig({
      stationaryRadius: value
    }, (config) => {
      this.props.addBgState(config);
      console.log("- setConfig success");
    }, () => {
      console.warn("- Failed to setConfig");
    });
  };

  render() {
    return (
      <Container style={{
        flex:1
      }}>
        <Header>
          <Left>
            <Button transparent onPress={ this.goBackToHomescreen }>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
          <Title>Settings</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <ListItem style={{flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text style={{ alignSelf: 'flex-start' }}>desiredAccuracy</Text>
            <View style={{ flexDirection: 'row', alignContent: 'stretch', paddingTop: 20 }}>
              <Button style={ styles.button }
                      small
                      light={this.props.backgroundGeolocationState.desiredAccuracy !== 0}
                      onPress={() => this.handleOption('desiredAccuracy', 'value', 0)}>
                <Text>0</Text>
              </Button>
              <Button style={ styles.button }
                      small
                      light={this.props.backgroundGeolocationState.desiredAccuracy !== 10}
                      onPress={() => this.handleOption('desiredAccuracy', 'value', 10)}>
                <Text>10</Text>
              </Button>
              <Button style={ styles.button }
                      small
                      light={this.props.backgroundGeolocationState.desiredAccuracy !== 100}
                      onPress={() => this.handleOption('desiredAccuracy', 'value', 100)}>
                <Text>100</Text>
              </Button>
              <Button style={ styles.button }
                      small
                      light={this.props.backgroundGeolocationState.desiredAccuracy !== 1000}
                      onPress={() => this.handleOption('desiredAccuracy', 'value', 1000)}>
                <Text>1000</Text>
              </Button>
            </View>
          </ListItem>
          <ListItem style={{flexDirection: 'column'}}>
            <Text style={{ alignSelf: 'flex-start' }}>distanceFilter</Text>
            <Right><Text>{ this.props.backgroundGeolocationState.distanceFilter }</Text></Right>
            <Slider style={{ flex: 1 , width: '100%'}}
                    minimumValue={10}
                    maximumValue={500}
                    step={10}
                    value={ this.props.backgroundGeolocationState.distanceFilter }
                    onSlidingComplete={ this.handleOptionDistanceFilter }>
            </Slider>
          </ListItem>
          <ListItem onPress={() => this.handleOption('stopOnStationary', 'bool', this.props.backgroundGeolocationState.stopOnStationary)}>
            <Text>stopOnStationary</Text>
            <Right>
              <Radio
                selected={this.props.backgroundGeolocationState.stopOnStationary} />
            </Right>
          </ListItem>
          <ListItem style={{flexDirection: 'column'}}>
            <Text style={{ alignSelf: 'flex-start' }}>desiredOdometerAccuracy</Text>
            <Right><Text>{ this.props.backgroundGeolocationState.desiredOdometerAccuracy }</Text></Right>
            <Slider style={{ flex: 1 , width: '100%'}}
                    minimumValue={100}
                    maximumValue={300}
                    step={10}
                    value={ this.props.backgroundGeolocationState.desiredOdometerAccuracy }
                    onSlidingComplete={ this.handleOptionDesiredOdometerAccuracy }>
            </Slider>
          </ListItem>
          <ListItem style={{flexDirection: 'column'}}>
            <Text style={{ alignSelf: 'flex-start' }}>stationaryRadius</Text>
            <Right><Text>{ this.props.backgroundGeolocationState.stationaryRadius }</Text></Right>
            <Slider style={{ flex: 1 , width: '100%'}}
                    minimumValue={25}
                    maximumValue={200}
                    step={5}
                    value={ this.props.backgroundGeolocationState.stationaryRadius }
                    onSlidingComplete={ this.handleOptionStationaryRadius }>
            </Slider>
          </ListItem>


          <Text>{ JSON.stringify(this.props.backgroundGeolocationState) }</Text>
        </Content>
      </Container>

    )

  }
}

var styles = StyleSheet.create({
  button: {
    marginRight: 10
  }
});
const mapStateToProps = state => ({
  backgroundGeolocationState: state.backgroundGeolocationState,
});

const mapDispatchToProps = (dispatch) => ({
  addBgState: (payload) => {
    dispatch({type: 'ADD_BG_STATE', payload})
  }
});



export default connect(mapStateToProps, mapDispatchToProps)(TabLocationsSettings);

