import { Send } from '@mui/icons-material';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useState } from 'react';

export default function NewItemForm({
  newItem, // function: newItem(name, startDate, endDate, priority)
}) {
  const [newItemText, setNewItemText] = useState('');
  const [newItemDateMode, setNewItemDateMode] = useState('due'); // 'due' or 'range'
  const [newItemDates, setNewItemDates] = useState({
    dueDate: '',
    startDate: '',
    endDate: '',
  });
  const [newItemPriority, setNewItemPriority] = useState('low');

  const handleSubmit = e => {
    e.preventDefault();
    const startDate =
      newItemDateMode === 'range'
        ? newItemDates.startDate
        : newItemDates.dueDate;
    const endDate =
      newItemDateMode === 'range' ? newItemDates.endDate : newItemDates.dueDate;
    void newItem(newItemText, startDate, endDate, newItemPriority);
    setNewItemText('');
    setNewItemDates({ dueDate: '', startDate: '', endDate: '' });
    setNewItemPriority('low');
  };

  return (
    <Box
      component="form"
      sx={{
        width: '100%',
        mt: 4,
      }}
      onSubmit={handleSubmit}
    >
      <Box sx={{ width: '100%', mb: 2 }}>
        <TextField
          fullWidth
          onChange={e => setNewItemText(e.target.value)}
          value={newItemText}
          label="New Item"
          type="text"
          variant="filled"
          size="small"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          width: '100%',
        }}
      >
        <ToggleButtonGroup
          value={newItemDateMode}
          exclusive
          onChange={(event, newValue) => {
            // Only update if a new value is selected
            if (newValue !== null) {
              setNewItemDateMode(newValue);
            }
          }}
          size="smart"
          sx={{ flex: 1 }}
        >
          <ToggleButton value="due">Single Date</ToggleButton>
          <ToggleButton value="range">Date Range</ToggleButton>
        </ToggleButtonGroup>
        {newItemDateMode === 'due' ? (
          <TextField
            sx={{ flex: 1 }}
            type="date"
            label="Due Date"
            value={newItemDates.dueDate}
            onChange={e =>
              setNewItemDates(prev => ({ ...prev, dueDate: e.target.value }))
            }
            variant="filled"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        ) : (
          <>
            <TextField
              sx={{ flex: 1 }}
              type="date"
              label="Start Date"
              value={newItemDates.startDate}
              onChange={e =>
                setNewItemDates(prev => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
              variant="filled"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              sx={{ flex: 1 }}
              type="date"
              label="End Date"
              value={newItemDates.endDate}
              onChange={e =>
                setNewItemDates(prev => ({ ...prev, endDate: e.target.value }))
              }
              variant="filled"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </>
        )}
        <FormControl sx={{ flex: 1 }} variant="filled" size="small">
          <InputLabel id="new-item-priority-label">Priority</InputLabel>
          <Select
            labelId="new-item-priority-label"
            value={newItemPriority}
            onChange={e => setNewItemPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <IconButton type="submit" edge="end" aria-label="submit">
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
}
