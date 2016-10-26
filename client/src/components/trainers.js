import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { trainerQuery } from '../queries';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Toggle from 'material-ui/Toggle'; 

class TrainersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: {},
    };
  }

  handleToggle(id) {
    const toggled = this.state.expanded[id] ? false : true;
    this.setState({ 
      expanded: { 
        ...this.state.expanded,
        [id]: toggled 
      } 
    });
  }

  render() {
    const { trainers } = this.props;
    if (!trainers) return null;
    const listWithData = trainers.map(({ first_name, last_name, id }, i) => {
      if (i === 0 || i % 3 === 0) {
        return (
          <div className="row" key={i}>
            <div className="four columns card" key={i}>
              <Card 
                expanded={this.state.expanded[id]}
                onExpandChange={() => this.handleToggle(id)}
              >
                <CardHeader 
                  title={`${first_name} ${last_name}`}
                  avatar={`./images/${first_name}.png`} 
                />
                <CardText>
                  <Toggle
                    toggled={this.state.expanded[id]}
                    onToggle={() => this.handleToggle(id)}
                    labelPosition="right"
                    label="Show Pokemon & Battles"
                  />
                </CardText>
                <CardText expandable={true}>
                  Pokemon Go Here
                </CardText>
              </Card>
            </div>
          </div>
        );      
      }
      return (
        <div className="four columns card" key={i}>
          <Card 
            expanded={this.state.expanded[id]}
            onExpandChange={() => this.handleToggle(id)}
          >
            <CardHeader 
              title={`${first_name} ${last_name}`} 
              avatar={`./images/${first_name}.png`} 
            />
            <CardText>
              <Toggle
                toggled={this.state.expanded[id]}
                onToggle={() => this.handleToggle(id)}
                labelPosition="right"
                label="Show Pokemon & Battles"
              />
            </CardText>
            <CardText expandable={true}>
              Pokemon Go Here
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
})(TrainersList);
