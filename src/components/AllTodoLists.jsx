import * as Icons from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
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
      setCurrentList(data[0]?.id);
    }
  }, [currentList, data, setCurrentList]);

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
  );
}
