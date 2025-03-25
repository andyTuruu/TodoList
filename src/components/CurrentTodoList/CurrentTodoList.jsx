import * as Icons from '@mui/icons-material';
import {
  Box,
  Divider,
  InputLabel,
  List,
  ListItem,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { useTodoList } from '../../hooks/useTodoList.js';
import { useTodoLists } from '../../hooks/useTodoLists.js';
import { useApp } from '../../providers/AppContext.jsx';
import ListHeader from './ListHeader.jsx';
import NewItemForm from './NewItemForm.jsx';
import TodoListItem from './TodoListItem.jsx';

export function CurrentTodoList() {
  const { currentList } = useApp();
  const { data, newItem, deleteItem, toggleChecked, updateItem } =
    useTodoList(currentList);
  const { updateList } = useTodoLists();
  const [originalListItems, setOriginalListItems] = useState({});

  // New sort mode state: 'startDate' or 'priority'
  const [sortMode, setSortMode] = useState('priority'); // default sort mode

  useEffect(() => {
    if (data?.items) {
      setOriginalListItems(
        data.items.reduce(
          (acc, { id, name, startDate, endDate, priority }) => ({
            ...acc,
            [id]: {
              name,
              startDate: startDate || '',
              endDate: endDate || '',
              priority: priority || 'low',
            },
          }),
          {}
        )
      );
    }
  }, [data]);

  const Icon = Icons[data?.icon];

  // Sorting functions: For start date, earliest first.
  const sortByStartDate = (a, b) => {
    const dateA = a.startDate ? new Date(a.startDate) : null;
    const dateB = b.startDate ? new Date(b.startDate) : null;
    if (dateA && dateB) {
      return dateA - dateB;
    }
    if (!dateA && !dateB) {
      return 0;
    }
    return dateA ? -1 : 1;
  };

  // For priority sorting: high > medium > low
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sortByPriority = (a, b) => {
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  };

  // Memoized sorted items to avoid unnecessary recalculations.
  const sortedItems = useMemo(() => {
    let items = data?.items || [];
    if (sortMode === 'startDate') {
      items = [...items].sort((a, b) => {
        const aData = originalListItems[a.id] || {};
        const bData = originalListItems[b.id] || {};
        return sortByStartDate(aData, bData);
      });
    } else if (sortMode === 'priority') {
      items = [...items].sort((a, b) => {
        const aData = originalListItems[a.id] || { priority: 'low' };
        const bData = originalListItems[b.id] || { priority: 'low' };
        return sortByPriority(aData, bData);
      });
    }
    return items;
  }, [data?.items, originalListItems, sortByPriority, sortMode]);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Box sx={{ flex: 1 }}>
        {data ? (
          <>
            <ListHeader data={data} updateList={updateList} Icon={Icon} />
            <Divider />
            {/* Sorting Controls */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                mb: 2,
                mt: 2,
              }}
            >
              <InputLabel id="sort-mode-label" sx={{ mb: 1 }}>
                Sort by
              </InputLabel>
              <ToggleButtonGroup
                value={sortMode}
                exclusive
                onChange={(event, newSort) => {
                  if (newSort !== null) {
                    setSortMode(newSort);
                  }
                }}
                size="small"
              >
                <ToggleButton value="priority">Priority</ToggleButton>
                <ToggleButton value="startDate">Start Date</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                mx: 'auto',
                mt: 2,
              }}
            >
              {sortedItems.map(item => (
                <TodoListItem
                  key={item.id}
                  item={item}
                  toggleChecked={toggleChecked}
                  deleteItem={deleteItem}
                  updateItem={updateItem}
                />
              ))}
              <ListItem>
                <NewItemForm newItem={newItem} />
              </ListItem>
            </List>
          </>
        ) : (
          <Typography>No List Selected</Typography>
        )}
      </Box>
    </Box>
  );
}
