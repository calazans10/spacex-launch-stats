import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export const LaunchItem = ({ id, mission_name, launch_date_local, launch_success }) => {
  const spanClass = classNames({
    'text-success': launch_success,
    'text-danger': !launch_success,
  });

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Mission: <span className={spanClass}>{mission_name}</span>{' '}
          </h4>
          <p>
            Date: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment>
          </p>
        </div>
        <div className="col-md-3">
          <Link className="btn btn-secondary" to={`/launch/${id}`}>
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LaunchItem;
