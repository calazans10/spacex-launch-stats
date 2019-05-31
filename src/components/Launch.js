import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const LAUNCH_QUERY = gql`
  query LaunchQuer($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      launch_year
      launch_success
      rocket {
        rocket {
          id
        }
        rocket_name
        rocket_type
      }
    }
  }
`;

const Launch = ({ match }) => {
  let { id } = match.params;
  id = parseInt(id, 10);

  return (
    <>
      <Query query={LAUNCH_QUERY} variables={{ id }}>
        {({ loading, data, error }) => {
          if (loading) {
            return <h4>Loading...</h4>;
          }

          if (error) {
            console.log(error);
          }

          const {
            id,
            mission_name,
            launch_year,
            launch_success,
            rocket: { rocket, rocket_name, rocket_type },
          } = data.launch;

          return (
            <div>
              <h1 className="display-4 my-3">
                Mission: <span className="text-dark">{mission_name}</span>
              </h1>
              <h4 className="mb-3">Launch Details</h4>
              <ul className="list-group">
                <li className="list-group-item">Flight Number: {id}</li>
                <li className="list-group-item">Launch Year: {launch_year}</li>
                <li className="list-group-item">
                  Launch Successful:{' '}
                  <span
                    className={classNames({
                      'text-success': launch_success,
                      'text-danger': !launch_success,
                    })}
                  >
                    {launch_success ? 'yes' : 'no'}
                  </span>
                </li>
              </ul>

              <h4 className="my-3">Rocket Details</h4>
              <ul className="list-group">
                <li className="list-group-item">Rocket ID: {rocket.id}</li>
                <li className="list-group-item">Rocket Name: {rocket_name}</li>
                <li className="list-group-item">Rocket Type: {rocket_type}</li>
              </ul>
              <hr />
              <Link to="/" className="btn btn-secondary">
                Back
              </Link>
            </div>
          );
        }}
      </Query>
    </>
  );
};

export default Launch;
