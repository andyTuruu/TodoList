import { DeleteOutlineRounded } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControl,
  IconButton,
  InputLabel,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

// Priority color mapping (using MUI palette colors as an example)
const priorityColors = {
  high: 'error.light',
  medium: 'warning.light',
  low: 'success.light',
};

export default function TodoListItem({
  item,
  toggleChecked,
  deleteItem,
  updateItem,
}) {
  const { id, checked } = item;
  const labelId = `checkbox-list-label-${id}`;

  // Local state for inline edits
  const [itemData, setItemData] = useState({
    name: item.name || '',
    startDate: item.startDate || '',
    endDate: item.endDate || '',
    priority: item.priority || 'low',
  });

  // If the parent item prop changes, update local state.
  useEffect(() => {
    setItemData({
      name: item.name || '',
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      priority: item.priority || 'low',
    });
  }, [item]);

  return (
    <ListItem
      key={id}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => deleteItem(id)}
        >
          <DeleteOutlineRounded />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} onClick={() => toggleChecked(id)} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked ?? false}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText
          id={labelId}
          sx={{
            position: 'relative',
            // If you want to use a continuous line via a pseudo-element, add it here as needed.
            '&::after': {
              content: "''",
              display: checked ? 'block' : 'none',
              position: 'absolute',
              left: 0,
              right: 0,
              top: '65%',
              borderTop: '2px solid',
              transform: 'translateY(-50%)',
              zIndex: 1, // ensures the line appears on top of the content if needed
            },
          }}
          onClick={e => e.stopPropagation()}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              // Apply text color based on priority:
              color: priorityColors[itemData.priority] || 'inherit',
              // Force the color on nested inputs and labels:
              '& .MuiInputBase-input': {
                color: priorityColors[itemData.priority] || 'inherit',
              },
              '& .MuiInputLabel-root': {
                color: priorityColors[itemData.priority] || 'inherit',
              },
              '& .MuiSelect-select': {
                color: priorityColors[itemData.priority] || 'inherit',
              },
            }}
          >
            {/* Editable Item Name */}
            <TextField
              sx={{ flex: 3 }}
              label="Item"
              size="small"
              variant="standard"
              onClick={e => e.stopPropagation()}
              onChange={e => setItemData({ ...itemData, name: e.target.value })}
              onBlur={e =>
                void updateItem(
                  id,
                  e.target.value,
                  itemData.startDate,
                  itemData.endDate,
                  itemData.priority
                )
              }
              value={itemData.name}
            />
            {itemData.startDate === itemData.endDate &&
            itemData.startDate !== '' ? (
              // If both dates are the same, show one "Due Date" field.
              <TextField
                sx={{ flex: 1 }}
                label="Due Date"
                type="date"
                size="small"
                variant="standard"
                InputLabelProps={{ shrink: true }}
                onChange={e =>
                  setItemData({
                    ...itemData,
                    startDate: e.target.value,
                    endDate: e.target.value,
                  })
                }
                onBlur={e =>
                  void updateItem(
                    id,
                    itemData.name,
                    e.target.value,
                    e.target.value,
                    itemData.priority
                  )
                }
                value={itemData.startDate}
              />
            ) : (
              // Otherwise, show separate fields for Start Date and End Date.
              <>
                <TextField
                  sx={{ flex: 1 }}
                  label="Start Date"
                  type="date"
                  size="small"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  onChange={e =>
                    setItemData({ ...itemData, startDate: e.target.value })
                  }
                  onBlur={e =>
                    void updateItem(
                      id,
                      itemData.name,
                      e.target.value,
                      itemData.endDate,
                      itemData.priority
                    )
                  }
                  value={itemData.startDate}
                />
                <TextField
                  sx={{ flex: 1 }}
                  label="End Date"
                  type="date"
                  size="small"
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  onChange={e =>
                    setItemData({ ...itemData, endDate: e.target.value })
                  }
                  onBlur={e =>
                    void updateItem(
                      id,
                      itemData.name,
                      itemData.startDate,
                      e.target.value,
                      itemData.priority
                    )
                  }
                  value={itemData.endDate}
                />
              </>
            )}

            {/* Priority Selector */}
            <FormControl sx={{ flex: 1 }} variant="standard" size="small">
              <InputLabel id={`priority-label-${id}`}>Priority</InputLabel>
              <Select
                labelId={`priority-label-${id}`}
                label="Priority"
                value={itemData.priority}
                onChange={e => {
                  const newPriority = e.target.value;
                  setItemData({ ...itemData, priority: newPriority });
                  void updateItem(
                    id,
                    itemData.name,
                    itemData.startDate,
                    itemData.endDate,
                    newPriority
                  );
                }}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
