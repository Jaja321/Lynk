import React, { Component } from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

class SortSelect extends Component{
  state={value: "hot"};

  render(){
    return(
      <Select
      value={this.state.value}
      onChange={this.handleChange}
      >
          <MenuItem value={"hot"}>Hot</MenuItem>
          <MenuItem value={"top"}>Top</MenuItem>
          <MenuItem value={"new"}>New</MenuItem>
      </Select>
      );
  }

  handleChange=(event)=>{
    this.setState({value: event.target.value});
    this.props.setSort(event.target.value);
  }
}

export default SortSelect;