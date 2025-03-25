import * as Icons from '@mui/icons-material';
import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

import { useApp } from '../../providers/AppContext';

// Component for the list header (icon and list title)
export default function ListHeader({ data, updateList, Icon }) {
  const { currentList } = useApp();
  const [originalListName, setOriginalListName] = useState('');
  useEffect(() => {
    if (data?.name) {
      setOriginalListName(data.name);
    }
  }, [currentList, data?.name]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Box
        sx={{
          border: theme => `1px solid ${theme.palette.divider}`,
          p: 1,
          mr: 1,
          borderRadius: '50%',
          display: 'flex',
        }}
      >
        {Icon ? <Icon fontSize="large" /> : <Icons.List fontSize="large" />}
      </Box>
      <TextField
        value={originalListName}
        onChange={e => setOriginalListName(e.target.value)}
        onBlur={e => void updateList(data.id, e.target.value)}
        variant="standard"
      />
    </Box>
  );
}
