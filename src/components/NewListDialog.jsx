import * as Icons from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
<<<<<<< HEAD
  DialogContentText,
=======
>>>>>>> 18c22ae (Second commit)
  DialogTitle,
  TextField,
  ToggleButton,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useTodoLists } from '../hooks/useTodoLists.js';

export function NewListDialog({ dialogState }) {
<<<<<<< HEAD
  const [state, setState] = useState('');
=======
  const [listName, setListName] = useState('');
>>>>>>> 18c22ae (Second commit)
  const [iconSearch, setIconSearch] = useState('');
  const [icon, setIcon] = useState('');
  const { newList } = useTodoLists();

  const [filteredIcons, setFilteredIcons] = useState(Object.entries(Icons));

  useEffect(() => {
    setFilteredIcons(
      Object.entries(Icons)
        .filter(([name]) => !/Outlined$|TwoTone$|Rounded$|Sharp$/.test(name))
        .filter(([name]) => (iconSearch ? name.includes(iconSearch) : true))
        .slice(0, 9)
    );
  }, [iconSearch]);

  return (
    <Dialog open={dialogState.isOpen} onClose={dialogState.close}>
      <DialogTitle>Create New List</DialogTitle>
      <DialogContent>
<<<<<<< HEAD
        <DialogContentText>Create a new list</DialogContentText>
        <TextField
          onChange={event => {
            setState(event.target.value);
          }}
          value={state}
          autoFocus
          margin="dense"
          id="name"
=======
        <TextField
          autoFocus
          onChange={event => {
            setListName(event.target.value);
          }}
          value={listName}
          margin="dense"
          id="list-name"
>>>>>>> 18c22ae (Second commit)
          label="New List"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          onChange={event => {
            setIconSearch(event.target.value);
          }}
          value={iconSearch}
<<<<<<< HEAD
          autoFocus
          margin="dense"
          id="name"
=======
          margin="dense"
          id="icon-search"
>>>>>>> 18c22ae (Second commit)
          label="Icon Search"
          type="text"
          fullWidth
          variant="standard"
        />
        <Card
          variant="outlined"
          sx={{ mt: 1, p: 1, display: 'flex', justifyContent: 'center' }}
        >
          {filteredIcons.map(([name, Icon]) => (
            <Box
              sx={{
                display: 'inline-flex',
                flexDirection: 'column',
                width: 40,
                mx: 1,
              }}
              key={name}
            >
              <ToggleButton
                value={name}
                selected={name === icon}
                onClick={() => setIcon(name)}
              >
                <Icon />
              </ToggleButton>
              <Typography
                variant="caption"
                align="center"
                sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                {name}
              </Typography>
            </Box>
          ))}
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogState.close}>Cancel</Button>
        <Button
          onClick={() => {
<<<<<<< HEAD
            void newList(state, icon);
            dialogState.close();
          }}
=======
            void newList(listName, icon);
            dialogState.close();
            setListName('');
            setIconSearch('');
            setIcon('');
          }}
          disabled={!listName.trim()}
>>>>>>> 18c22ae (Second commit)
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
