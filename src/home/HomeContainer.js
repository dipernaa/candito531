import React from 'react';
import { connect } from 'react-redux';

export const HomeContainer = ({ user }) => (!console.log(user) &&
  <div>
    {user.email}
  </div>
);

export const mapStateToProps = (state) => {
  const { auth } = state;

  return {
    user: auth.user
  };
};

export default connect(mapStateToProps)(HomeContainer);
