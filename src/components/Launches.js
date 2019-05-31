import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      id
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

export const Launches = () => (
  <>
    <h1 className="display-4 my-3">Launches</h1>
    <MissionKey />
    <Query query={LAUNCHES_QUERY}>
      {({ loading, error, data }) => {
        if (loading) {
          return <h4>Loading...</h4>;
        }

        if (error) {
          console.log(error);
        }

        return (
          <>
            {data.launches.map(launch => (
              <LaunchItem key={launch.id} {...launch} />
            ))}
          </>
        );
      }}
    </Query>
  </>
);

export default Launches;
