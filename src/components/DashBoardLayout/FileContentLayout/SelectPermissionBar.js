import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function SelectPermission(props) {




  const classes = useStyles();
  const [permission, setPermission] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setPermission(event.target.value);
    props.getPermission(event.target.value);
  
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Permission</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={permission}
          onChange={handleChange}
        >
          <MenuItem value={'view'}>View</MenuItem>
          <MenuItem value={'download'}>Download</MenuItem>
          <MenuItem value={'update'}>Update</MenuItem>
          <MenuItem value={'delete'}>Delete</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
