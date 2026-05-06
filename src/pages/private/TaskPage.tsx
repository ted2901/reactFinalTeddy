import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useAlert, useAxios } from '../../hooks';
import type { Task } from '../../models';

export const TaskPage = () => {
  const axios = useAxios();
  const { showAlert } = useAlert();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskName, setTaskName] = useState('');
  const [nameError, setNameError] = useState('');
  const [saving, setSaving] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/tasks');
      const payload = response.data;
      setTasks(Array.isArray(payload) ? payload : (payload.data ?? []));
    } catch {
      showAlert('Error al cargar las tareas', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreateDialog = () => {
    setEditingTask(null);
    setTaskName('');
    setNameError('');
    setDialogOpen(true);
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setTaskName(task.name);
    setNameError('');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingTask(null);
    setTaskName('');
    setNameError('');
  };

  const saveTask = async () => {
    if (taskName.trim().length < 3) {
      setNameError('El nombre debe tener al menos 3 caracteres');
      return;
    }
    setSaving(true);
    try {
      if (editingTask) {
        // PUT devuelve [1], no el objeto → actualizamos estado manualmente
        await axios.put(`/tasks/${editingTask.id}`, { name: taskName.trim() });
        setTasks((prev) =>
          prev.map((t) =>
            t.id === editingTask.id ? { ...t, name: taskName.trim() } : t,
          ),
        );
        showAlert('Tarea actualizada', 'success');
      } else {
        const response = await axios.post('/tasks', { name: taskName.trim() });
        setTasks((prev) => [...prev, response.data]);
        showAlert('Tarea creada', 'success');
      }
      closeDialog();
    } catch {
      showAlert('Error al guardar la tarea', 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;
    try {
      await axios.delete(`/tasks/${deleteId}`);
      setTasks((prev) => prev.filter((t) => t.id !== deleteId));
      showAlert('Tarea eliminada', 'success');
    } catch {
      showAlert('Error al eliminar la tarea', 'error');
    } finally {
      setDeleteId(null);
    }
  };

  // PATCH requiere enviar el nuevo valor de done en el body
  const toggleStatus = async (task: Task) => {
    const newDone = !task.done;
    try {
      await axios.patch(`/tasks/${task.id}`, { done: newDone });
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, done: newDone } : t)),
      );
    } catch {
      showAlert('Error al actualizar el estado', 'error');
    }
  };

  const pending = tasks.filter((t) => !t.done);
  const completed = tasks.filter((t) => t.done);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Mis Tareas
          </Typography>
          {!loading && (
            <Typography variant="body2" color="text.secondary">
              {pending.length} pendiente{pending.length !== 1 ? 's' : ''} ·{' '}
              {completed.length} finalizada{completed.length !== 1 ? 's' : ''}
            </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreateDialog}
        >
          Nueva Tarea
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : tasks.length === 0 ? (
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No hay tareas aún
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Crea tu primera tarea haciendo clic en "Nueva Tarea"
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={openCreateDialog}
          >
            Crear tarea
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          {pending.length > 0 && (
            <>
              <Box
                sx={{
                  px: 2,
                  pt: 2,
                  pb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                >
                  PENDIENTES
                </Typography>
                <Chip label={pending.length} size="small" color="primary" />
              </Box>
              <List disablePadding>
                {pending.map((task, idx) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    divider={idx < pending.length - 1}
                    onEdit={openEditDialog}
                    onDelete={(id) => setDeleteId(id)}
                    onToggle={toggleStatus}
                  />
                ))}
              </List>
            </>
          )}

          {pending.length > 0 && completed.length > 0 && <Divider />}

          {completed.length > 0 && (
            <>
              <Box
                sx={{
                  px: 2,
                  pt: 2,
                  pb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  color="success.main"
                  sx={{ fontWeight: 'bold' }}
                >
                  FINALIZADAS
                </Typography>
                <Chip label={completed.length} size="small" color="success" />
              </Box>
              <List disablePadding>
                {completed.map((task, idx) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    divider={idx < completed.length - 1}
                    onEdit={openEditDialog}
                    onDelete={(id) => setDeleteId(id)}
                    onToggle={toggleStatus}
                  />
                ))}
              </List>
            </>
          )}
        </Paper>
      )}

      {/* Dialog: crear / editar */}
      <Dialog open={dialogOpen} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {editingTask ? 'Editar Tarea' : 'Nueva Tarea'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre de la tarea"
            value={taskName}
            onChange={(e) => {
              setTaskName(e.target.value);
              setNameError('');
            }}
            onKeyDown={(e) => e.key === 'Enter' && saveTask()}
            fullWidth
            margin="normal"
            error={!!nameError}
            helperText={nameError}
            disabled={saving}
            autoFocus
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeDialog} disabled={saving}>
            Cancelar
          </Button>
          <Button
            onClick={saveTask}
            variant="contained"
            disabled={saving}
            startIcon={
              saving ? <CircularProgress size={16} color="inherit" /> : null
            }
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog: confirmar eliminación */}
      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)}>
        <DialogTitle>Eliminar tarea</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se
            puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDeleteId(null)}>Cancelar</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

interface TaskItemProps {
  task: Task;
  divider: boolean;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onToggle: (task: Task) => void;
}

const TaskItem = ({
  task,
  divider,
  onEdit,
  onDelete,
  onToggle,
}: TaskItemProps) => (
  <ListItem
    divider={divider}
    secondaryAction={
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        <Tooltip title="Editar">
          <IconButton size="small" onClick={() => onEdit(task)}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Eliminar">
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(task.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    }
  >
    <ListItemIcon sx={{ minWidth: 40 }}>
      <Tooltip
        title={task.done ? 'Marcar como pendiente' : 'Marcar como finalizada'}
      >
        <Checkbox
          edge="start"
          checked={task.done}
          onChange={() => onToggle(task)}
          color="success"
          size="small"
        />
      </Tooltip>
    </ListItemIcon>
    <ListItemText
      primary={task.name}
      slotProps={{
        primary: {
          sx: {
            textDecoration: task.done ? 'line-through' : 'none',
            color: task.done ? 'text.disabled' : 'text.primary',
            transition: 'all 0.2s',
          },
        },
      }}
    />
  </ListItem>
);
