import React from 'react'
import { View, FlatList, RefreshControl } from 'react-native';
import { Container, Content, Header, Body, Title, List, ListItem, Text } from 'native-base';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { HashsItem } from './HashsItem';
class TabMatchesHomescreen extends React.Component {

  _navigateToHashsDetail(itemId, onRefresh) {
    this.props.navigation.navigate('TabMatchesHashsDetail', { itemId, onRefresh });
  };

  _onRefresh = () => {
    this.props.data.refetch();
  };

  _keyExtractor = (item, index) => item.id;

  render() {
    let loadingAndError = null;
    const { data } = this.props;
    if (data.loading) {
      loadingAndError =  (<Text>Loading</Text>);
    }

    if (data.error) {
      console.log(data.error);
      loadingAndError = (<Text>An unexpected error occurred</Text>);
    }
    return (
      <Container style={{
        flex:1,
      }}>
        <Header>
          <Body>
          <Title>Matches</Title>
          </Body>
        </Header>

        <Content refreshControl={ <RefreshControl
            refreshing={ this.props.data.loading }
            onRefresh={ this._onRefresh }
          /> }>
          {loadingAndError ? (loadingAndError) :
            <FlatList
              data={data.user.tags}
              keyExtractor={this._keyExtractor}
              renderItem={({item}) => <ListItem onPress={() => this._navigateToHashsDetail(item.id, this.onRefresh )}><HashsItem hashs={item.hashs}></HashsItem></ListItem>}
            />
          }
        </Content>
      </Container>
    )
  }
}

TabMatchesHomescreen.propTypes = {
  data: React.PropTypes.shape({
    loading: React.PropTypes.bool,
    error: React.PropTypes.object,
    user: React.PropTypes.object
  }).isRequired,
};

const MATCHES_QUERY = gql`
query {user(id: "93f4fe90-4e01-11e7-98de-db86d3572b09") {
  id,
  tags {
    id,
    hashs
    }
  }
}`;

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch) => ({
});


const withMatchesQuery = graphql(MATCHES_QUERY, {});
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withMatchesQuery
)(TabMatchesHomescreen)
//const TabMatchesHomescreenWithData = graphql(MATCHES_QUERY)(TabMatchesHomescreen);

//export default TabMatchesHomescreenWithData;

