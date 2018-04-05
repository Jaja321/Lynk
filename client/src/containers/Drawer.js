import React from 'react';
import { withStyles } from 'material-ui/styles';
import NavDrawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import DrawerList from './DrawerList.js';
import { connect } from 'react-redux';
import { closeDrawer } from '../actions';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class Drawer extends React.Component {
  closeMe = () => {
      this.props.dispatch(closeDrawer());
    }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavDrawer
          open={this.props.open}
          onClose={this.closeMe}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.closeMe}
            onKeyDown={this.closeMe}
          >
            <DrawerList/>
          </div>
        </NavDrawer>
      
      </div>
    );
  }
}

const mapStateToProps = state=>({open : state.general.drawerOpen});

export default connect(mapStateToProps)(withStyles(styles)(Drawer));