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
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import StatusBadge from '../../../components/common/StatusBadge/StatusBadge';
import { PERSONAS } from '../../../constants/personas';
import { DEPARTMENTS } from '../../../constants/departments';
import styles from './EmployeeListAccess.module.scss';

export const EmployeeListAccess = () => {
  const [employees, setEmployees] = useState(Object.values(PERSONAS));
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Staff Engineer');
  const [selectedDepts, setSelectedDepts] = useState(['sales']);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newEmp = {
      key: `emp_${Date.now()}`,
      id: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      name,
      email,
      role,
      isAdmin: false,
      depts: selectedDepts,
      perms: { sales: { view: true, create: true, edit: false, workflow: false } }
    };
    setEmployees([newEmp, ...employees]);
    setIsAddOpen(false);
    setName('');
    setEmail('');
  };

  const handleToggleDept = (deptKey) => {
    if (selectedDepts.includes(deptKey)) {
      setSelectedDepts(selectedDepts.filter((d) => d !== deptKey));
    } else {
      setSelectedDepts([...selectedDepts, deptKey]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Staff Directory"
              subtitle="Employee Profiles & Department Assignments"
              showBack
              actions={
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => setIsAddOpen(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Add Employee
                </Button>
              }
            />
          </div>
        </div>

        <div className={styles.middlerow}>
          <div className={styles.list}>
            {employees.map((emp) => (
              <Card key={emp.id} className={styles.card}>
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#0284C7' }}>
                        {emp.id} • {emp.role}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {emp.name}
                      </Typography>
                    </Box>
                    <StatusBadge status="Active Account" size="small" />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                    Email: {emp.email}
                  </Typography>

                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#0F172A', display: 'block', mb: 0.5 }}>
                    ASSIGNED DEPARTMENTS:
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                    {emp.depts.map((d) => {
                      const dept = DEPARTMENTS[d];
                      return (
                        <Chip
                          key={d}
                          label={dept?.name || d}
                          size="small"
                          sx={{
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            bgcolor: dept?.lightBg || '#F1F5F9',
                            color: dept?.color || '#0F172A'
                          }}
                        />
                      );
                    })}
                  </Box>

                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setSelectedEmp(emp);
                      setSelectedDepts(emp.depts);
                      setIsAssignOpen(true);
                    }}
                  >
                    Edit Department Access
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Employee Dialog */}
        <Dialog open={isAddOpen} onClose={() => setIsAddOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>Onboard New Employee</DialogTitle>
          <form onSubmit={handleAddSubmit}>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <TextField label="Corporate Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <TextField label="Designation / Role" value={role} onChange={(e) => setRole(e.target.value)} required />

              <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 1 }}>Assign Workspaces:</Typography>
              <FormGroup>
                {Object.values(DEPARTMENTS).filter((d) => d.key !== 'admin').map((d) => (
                  <FormControlLabel
                    key={d.key}
                    control={<Checkbox checked={selectedDepts.includes(d.key)} onChange={() => handleToggleDept(d.key)} />}
                    label={d.name}
                  />
                ))}
              </FormGroup>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">Create Employee Account</Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Edit Access Dialog */}
        {selectedEmp && (
          <Dialog open={isAssignOpen} onClose={() => setIsAssignOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontWeight: 700 }}>Update Workspaces for {selectedEmp.name}</DialogTitle>
            <DialogContent dividers>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select the authorized departments for this employee.
              </Typography>
              <FormGroup>
                {Object.values(DEPARTMENTS).filter((d) => d.key !== 'admin').map((d) => (
                  <FormControlLabel
                    key={d.key}
                    control={<Checkbox checked={selectedDepts.includes(d.key)} onChange={() => handleToggleDept(d.key)} />}
                    label={d.name}
                  />
                ))}
              </FormGroup>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setIsAssignOpen(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={() => {
                  setEmployees(employees.map((e) => (e.id === selectedEmp.id ? { ...e, depts: selectedDepts } : e)));
                  setIsAssignOpen(false);
                }}
              >
                Save Changes
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default EmployeeListAccess;
