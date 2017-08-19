import React from 'react'
import moment from 'moment';
import { View, FlatList, RefreshControl } from 'react-native'
import { Container, List, Content, Card, Header, CardItem, Body, Title, Text, Icon, Right, Left} from 'native-base';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';

class TabMatchesHashsDetail extends React.Component {

  constructor(props) {
    super(props);
  }

  parseTimestamp = (timestamp) => {
    const momentTimestamp = moment(timestamp, 'x');
    return momentTimestamp.format('DD.MM.YYYY HH:mm');
  };

  _onRefresh = () => {
    this.props.data.refetch();
  };

  render() {
    const { data } = this.props;
    let loadingAndError = null;
    if (data.loading) {
      loadingAndError = (<Text>Loading</Text>);
    }

    if (data.error) {
      console.log(data.error);
      loadingAndError = (<Text>An unexpected error occurred</Text>);
    }
    const { tag } = this.props.data;
    return (
      <Container style={{
        flex:1,
      }}>
        <Header>
          <Body>
          <Title>{ loadingAndError ? ('loading..') : tag.hashs }</Title>
          </Body>
        </Header>
        <Content refreshControl={ <RefreshControl
            refreshing={ this.props.data.loading }
            onRefresh={ this._onRefresh }
          /> }>
          {loadingAndError ? (loadingAndError) :
            <List>
            {
              tag.matches.map((element, index)=>
                <Card style={{flex: 0}} key={index}>
                  <CardItem>
                    <Left>
                      <Body>
                      <Text>Location Match</Text>
                      <Text note>{this.parseTimestamp(element.timestamp)}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Left style={{flex: 0.3}}><Text>Long/Lat:</Text></Left>
                    <Right>
                      <Text>{`${element.long}`}</Text>
                      <Text>{`${element.lat}`}</Text>
                    </Right>
                  </CardItem>
                  <CardItem>
                    <Left><Text>User 1:</Text></Left>
                    <Text>{`${element.users[0].first_name}, ${element.users[0].last_name}`}</Text>
                  </CardItem>
                  <CardItem>
                    <Left><Text>User 2:</Text></Left>
                    <Text>{`${element.users[1].first_name}, ${element.users[1].last_name}`}</Text>
                  </CardItem>
                </Card >)
            }
          </List>
          }
        </Content>
      </Container>
    )
  }
}
const TAG_QUERY = gql`
query CurrentMatchesForTag($tagId: ID!) {
  tag(id: $tagId) {
    id,
    hashs,
    matches {
      id
      timestamp,
      lat,
      long,
      users {
        id,
        first_name,
        last_name
      }
    }
  }
}`;

const mapStateToProps = state => ({
});

const mapDispatchToProps = (dispatch) => ({
});


const withTagQuery = graphql(TAG_QUERY, {
  options: ({ navigation }) => ({ variables: { tagId : navigation.state.params.itemId }})
});
export default compose(
  //connect(mapStateToProps, mapDispatchToProps),
  withTagQuery
)(TabMatchesHashsDetail)

