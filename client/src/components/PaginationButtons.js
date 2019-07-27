import React from 'react';
import Button from 'material-ui/Button';


const buttonStyle={
  marginTop: 10,
  marginLeft: 10,
  marginBottom: 10
}

function PaginationButtons(props){
  return(
  <div style={{marginX: 'auto'}}>

  <Button
  variant="raised"
  color="primary"
  style={buttonStyle}
  disabled= {props.firstPage}
  onClick= {props.prevPage}
  >
  Previous
  </Button>

  <Button
  variant="raised"
  color="primary"
  style={buttonStyle}
  onClick= {props.nextPage}
  >
  Next
  </Button>
  </div>
  )
}

export default PaginationButtons;