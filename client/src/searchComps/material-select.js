import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });
  

class MaterialSelect extends Component {
    state={
        labelWidth: 0,
        place:''
    }

    handleChange = event => {
        this.setState({ place : event.target.value });
        this.props.onPassData(event.target.value)
      };
    
    render(){
        const { classes } = this.props;
        
        return (
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel >{this.props.dir}</InputLabel>
                <Select
                  value={this.state.place}
                  onChange={this.handleChange}
                  
                >
                  <MenuItem value='kgp'>KGP</MenuItem>
                  <MenuItem value='ccu'>CCU Kolkata Airport</MenuItem>
                  <MenuItem value='railway-station'>Railway Station-KGP</MenuItem>
                  <MenuItem value='howrah'>Howrah</MenuItem>
                </Select>
              </FormControl>
  
            </div>
        );

    }
};

export default withStyles(styles)(MaterialSelect);