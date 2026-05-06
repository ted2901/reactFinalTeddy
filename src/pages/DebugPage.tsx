import { Box, Typography, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

const DebugPage = () => {
  const { user, status } = useAuth();
  const { tasks, isLoading } = useTasks();
  const token = localStorage.getItem('token');

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>🔧 Debug Information</Typography>

      <Typography variant="subtitle1">Auth Status: {status}</Typography>
      <Typography variant="subtitle1">User: {user ? `${user.name} (${user.username})` : 'None'}</Typography>
      <Typography variant="subtitle1">Token: {token ? token.slice(0, 20) + '...' : 'No token'}</Typography>
      <Chip label={isLoading ? 'Loading tasks...' : `Tasks loaded: ${tasks.length}`} sx={{ mt: 2 }} />
      <Box component="pre" sx={{ mt: 2, backgroundColor: '#f5f5f5', p: 2, borderRadius: 2 }}>
        {JSON.stringify(tasks, null, 2)}
      </Box>
    </Box>
  );
};

export default DebugPage;
