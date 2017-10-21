import React from 'react';
import { browserHistory } from 'react-router';
import MuiAppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import BackArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';

const AppBar = ({ title, showBackArrow = false }) => (
  <MuiAppBar
    iconElementLeft={showBackArrow ? <IconButton><BackArrowIcon /></IconButton> : undefined}
    onLeftIconButtonTouchTap={showBackArrow ? () => browserHistory.goBack() : undefined}
    title={title}
    showMenuIconButton={showBackArrow}
  />
);

export default AppBar;
