import React, { Component } from 'react';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import Input, {InputLabel} from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import { FormControl, FormHelperText } from 'material-ui/Form';

class SortSelect extends Component{
  state={value: "hot"};

  render(){
    return(
       <FormControl style={{marginRight: 20, width: 100}}>
          <InputLabel style={{color: 'white'}}>Sort by</InputLabel>
          <Select
            value={this.state.value}
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
    this.setState({value: event.target.value});
    this.props.setSort(event.target.value);
  }
}

export default SortSelect;