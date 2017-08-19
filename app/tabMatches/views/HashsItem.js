import React from 'react';
import { Text} from 'native-base';

export class HashsItem extends React.PureComponent {

  showHashs = (hashs) => {
    if (hashs.length > 1) {
      return hashs.map((hash, index) => index === hashs.length - 1 ? hash : `${hash},`)
    } else {
      return hashs;
    }
  };

  render() {
    const { hashs } = this.props;
    return (
      <Text>{this.showHashs(hashs)}</Text>
    )
  }
}
