import * as Icons from '@mui/icons-material';
<<<<<<< HEAD
import {
  Drawer,
=======
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import {
  Drawer,
  IconButton,
>>>>>>> 18c22ae (Second commit)
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
<<<<<<< HEAD
  IconButton,
} from '@mui/material';
import { useEffect } from 'react';
import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../providers/AppState.jsx';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export function AllTodoLists() {
  const { data, deleteList } = useTodoLists(); // Fetch todo lists and delete function
  const { currentList, setCurrentList } = useAppState();

  useEffect(() => {
    if (!currentList) {
=======
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useTodoLists } from '../hooks/useTodoLists.js';
import { useApp } from '../providers/AppContext.jsx';
import { ConfirmDialog } from './ConfirmDialog.jsx';

export function AllTodoLists() {
  const { data, deleteList } = useTodoLists(); // add loading if necessary
  const { currentList, setCurrentList } = useApp();

  // State for confirmation dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  useEffect(() => {
    if (!currentList && data.length > 0) {
>>>>>>> 18c22ae (Second commit)
      setCurrentList(data[0]?.id);
    }
  }, [currentList, data, setCurrentList]);

<<<<<<< HEAD
  const handleDelete = async listId => {
    if (window.confirm('Are you sure you want to delete this list and all its items?')) {
      try {
        await deleteList(listId);
        alert('List deleted successfully.');
      } catch (error) {
        console.error('Failed to delete the list:', error);
        alert('An error occurred while deleting the list.');
      }
    }
  };

  return (
    <Drawer
      sx={{
        width: 0.25,
        minWidth: 200,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 0.25,
          minWidth: 200,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <List>
        {data.map(({ name, id, icon }) => {
          const Icon = Icons[icon];
          return (
            <ListItem key={id} disablePadding>
              <ListItemButton
                onClick={() => setCurrentList(id)}
                selected={currentList === id}
                sx={{marginLeft: 2}}
              >
                {Icon ? <Icon /> : <Icons.List />}
                <ListItemText sx={{ ml: 1 }} primary={name} />
              </ListItemButton>
              <IconButton
                edge="end"
                onClick={() => handleDelete(id)}
                aria-label={`delete ${name}`}
                sx={{marginRight: 2}}
              >
                <DeleteRoundedIcon />
              </IconButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
=======
  // Edge Case: Update currentList if the selected list was deleted.
  useEffect(() => {
    if (data.length > 0 && !data.some(list => list.id === currentList)) {
      setCurrentList(data[0]?.id);
    }
  }, [data, currentList, setCurrentList]);

  // Open the confirmation dialog and set the target list id
  const handleDeleteClick = id => {
    setListToDelete(id);
    setConfirmOpen(true);
  };

  // Called when the user confirms deletion in the dialog
  const handleConfirmDelete = async () => {
    try {
      await deleteList(listToDelete);
    } catch (error) {
      console.error('Failed to delete the list:', error);
      alert('An error occurred while deleting the list.');
    } finally {
      setConfirmOpen(false);
      setListToDelete(null);
    }
  };

  // Cancel the deletion
  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setListToDelete(null);
  };

  return (
    <>
      <Drawer
        sx={{
          width: 0.25,
          minWidth: 200,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 0.25,
            minWidth: 200,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Empty Toolbar for spacing */}
        <Toolbar />
        <List>
          {data.map(({ name, id, icon }) => {
            const Icon = Icons[icon];
            return (
              <ListItem key={id} disablePadding>
                <ListItemButton
                  onClick={() => setCurrentList(id)}
                  selected={currentList === id}
                >
                  {Icon ? <Icon /> : <Icons.List />}
                  <ListItemText sx={{ ml: 0.5 }} primary={name} />
                </ListItemButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteClick(id)}
                  aria-label={`delete ${name}`}
                  sx={{ marginRight: 2 }}
                >
                  <DeleteRoundedIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      {/* Render the confirmation dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this list and all its items?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
>>>>>>> 18c22ae (Second commit)
  );
}
