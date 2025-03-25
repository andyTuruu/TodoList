import { Box, CssBaseline } from '@mui/material';

<<<<<<< HEAD
import { AppState } from '../providers/AppState.jsx';
import { AllTodoLists } from './AllTodoLists.jsx';
import { AppHeader } from './AppHeader.jsx';
import { CurrentTodoList } from './CurrentTodoList.jsx';

export function App() {
  return (
    <AppState>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppHeader />
        <AllTodoLists />
        <CurrentTodoList />
      </Box>
    </AppState>
=======
import { AllTodoLists } from './AllTodoLists.jsx';
import { AppHeader } from './AppHeader.jsx';
import { CurrentTodoList } from './CurrentTodoList/CurrentTodoList.jsx';

export function App() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppHeader />
      <AllTodoLists />
      <CurrentTodoList />
    </Box>
>>>>>>> 18c22ae (Second commit)
  );
}
