import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { trainerQuery } from '../queries';
import { Card, CardHeader, CardText } from 'material-ui/Card'; 

class TrainersList extends Component {
  render() {
    const { trainers } = this.props;
    if (!trainers) return null;
    const listWithData = trainers.map(({ first_name, last_name }, i) => {
      if (i === 0 || i % 3 === 0) {
        return (
          <div className="row" key={i}>
            <div className="four columns card" key={i}>
              <Card>
                <CardHeader 
                  title={`${first_name} ${last_name}`}
                  avatar={`./images/${first_name}.png`} 
                />
                <CardText>
                  <code>{first_name}</code>
                </CardText>
              </Card>
            </div>
          </div>
        );      
      }
      return (
        <div className="four columns card" key={i}>
          <Card>
            <CardHeader 
              title={`${first_name} ${last_name}`} 
              avatar={`./images/${first_name}.png`} 
            />
            <CardText>
              <code>{first_name}</code>
            </CardText>
          </Card>
        </div>
      );
    });
    return <div className="cards">{listWithData}</div>;
  }
}

export default graphql(trainerQuery, {
  props: ({ 
    ownProps, 
    data: { 
      trainers
    } }) => ({ trainers }),
  withRef: true,
})(TrainersList);
