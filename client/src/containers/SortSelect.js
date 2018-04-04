import React, { Component } from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, {InputLabel} from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { connect } from 'react-redux'
import {setSort, fetchPosts} from '../actions';

class SortSelect extends Component{

  render(){
    return(
       <FormControl style={{marginRight: 20, width: 100}}>
          <InputLabel style={{color: 'white'}}>Sort by</InputLabel>
          <Select
            value={this.props.value}
            onChange={this.handleChange}
            style={{color: 'white'}}
          >
            <MenuItem value={"hot"}>Hot</MenuItem>
            <MenuItem value={"top"}>Top</MenuItem>
            <MenuItem value={"new"}>New</MenuItem>
          </Select>
        </FormControl>
      );
    
  }

  handleChange=(event)=>{
    const {dispatch} = this.props;
    dispatch(setSort(event.target.value));
    dispatch(fetchPosts());
  }
}

const mapStateToProps = state=>({value: state.general.sort})

export default connect(mapStateToProps)(SortSelect);