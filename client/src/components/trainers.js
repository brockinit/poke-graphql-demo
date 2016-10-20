import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { trainerQuery } from '../queries';
import { Card, CardHeader, CardText } from 'material-ui/Card';

class TrainersList extends Component {
  render() {
    const { trainers } = this.props;
    if (trainers.length === 0) return null;
    const listWithData = trainers.map((trainer) => {
      if (i === 0 || i % 3 === 0) {
        return (
          <div className="row">
            <div className="four columns card">
              <Card>
                <CardHeader title={trainer.id} />
                <CardText>
                  <code>{trainer.first_name}</code>
                </CardText>
              </Card>
            </div>
          </div>
        );      
      }
      return (
        <div className="four columns card">
          <Card>
            <CardHeader title={trainer.id} />
            <CardText>
              <code>{trainer.first_name}</code>
            </CardText>
          </Card>
        </div>
      );
    })
    return listWithData;
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
