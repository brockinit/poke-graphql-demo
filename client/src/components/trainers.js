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
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(event) {
    const { target: { name } } = event;
    const toggled = this.state.expanded[name] ? false : true;
    this.setState({ 
      expanded: { 
        ...this.state.expanded,
        [name]: toggled 
      } 
    });
  }

  render() {
    const { trainers } = this.props;
    if (!trainers) return null;
    const listWithData = trainers.map(({ first_name, last_name, id, pokemon }, i) =>
      <div className="four columns card" key={i}>
        <Card 
          expanded={this.state.expanded[id]}
          name={id}
          onExpandChange={this.handleToggle}
        >
          <CardHeader 
            title={`${first_name} ${last_name}`}
            avatar={`./images/${first_name}.png`} 
          />
          <CardText>
            <Toggle
              toggled={this.state.expanded[id]}
              name={id}
              onToggle={this.handleToggle}
              labelPosition="right"
              label="Show Pokemon & Battles"
            />
          </CardText>
          {pokemon.map(({ poke_name, poke_type, hp, attack }, i) =>
            <CardText expandable={true} key={`${poke_name} ${i}`}>
              <div className="row">
                <div className="six columns">
                  <h6>Name</h6>
                  <code>{poke_name}</code>
                </div>
                <div className="six columns">
                  <h6>Type</h6>
                  <code>{poke_type}</code>
                </div>
              </div>
              <div className="row">
                <div className="six columns">
                  <h6>HP</h6>
                  <code>{hp}</code>
                </div>
                <div className="six columns">
                  <h6>Attack</h6>
                  <code>{attack}</code>
                </div>
              </div>
            </CardText>
          )}
        </Card>
      </div>
    )
    .reduce((r, element, i) => {
      i % 3 === 0 && r.push([]);
      r[r.length - 1].push(element);
      return r;
    }, [])
    .map((content, i) => <div className="row">{content}</div>);

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
