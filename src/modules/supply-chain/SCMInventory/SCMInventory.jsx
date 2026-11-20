import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { useErpStore } from '../../../stores/erpStore';
import styles from './SCMInventory.module.scss';

export const SCMInventory = () => {
  const { materials } = useErpStore();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedMat, setSelectedMat] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [unit, setUnit] = useState('Pieces');
  const [stock, setStock] = useState(10);
  const [minStock, setMinStock] = useState(5);
  const [spec, setSpec] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    // Material master creation does NOT auto-increase inventory in production flow,
    // but in master creation it registers with initial count
    setIsAddOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Inventory & Materials Master"
              subtitle="Current Stock Levels, Min Thresholds & Warehouses"
              showBack
              actions={
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => setIsAddOpen(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Add Material
                </Button>
              }
            />
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.list}>
            {materials.map((m) => {
              const isLowStock = m.stock <= m.minStock;

              return (
                <Card key={m.id} className={styles.card} onClick={() => setSelectedMat(m)}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: '#D97706' }}>
                          {m.code} ({m.id})
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {m.name}
                        </Typography>
                      </Box>
                      {isLowStock ? (
                        <Chip
                          icon={<WarningAmberIcon />}
                          label="Low Stock Alert"
                          size="small"
                          color="warning"
                          sx={{ fontWeight: 600, fontSize: '0.6875rem' }}
                        />
                      ) : (
                        <StatusBadge status="Adequate Stock" size="small" />
                      )}
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Specification: {m.spec}
                    </Typography>

                    <Box sx={{ p: 1.5, bgcolor: '#F8FAFC', borderRadius: 2, display: 'flex', justifyContent: 'space-between' }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Current Available Stock:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: isLowStock ? '#D97706' : '#16A34A', lineHeight: 1 }}>
                          {m.stock} {m.unit}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary">Min Safety Stock:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {m.minStock} {m.unit}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Add Material Dialog */}
        <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>Register Raw Material Master</DialogTitle>
          <form onSubmit={handleAddSubmit}>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Material Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField label="Material Code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="e.g. RM-104" required />
                <TextField label="Unit of Measurement" value={unit} onChange={(e) => setUnit(e.target.value)} required />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField type="number" label="Initial Physical Stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} required />
                <TextField type="number" label="Minimum Safety Stock" value={minStock} onChange={(e) => setMinStock(Number(e.target.value))} required />
              </Box>
              <TextField label="Technical Specification" value={spec} onChange={(e) => setSpec(e.target.value)} multiline rows={2} />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">Save Material Master</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default SCMInventory;
