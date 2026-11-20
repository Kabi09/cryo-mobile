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
  Tabs,
  Tab
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';
import Inventory2Icon from '@mui/icons-material/Inventory2';

import PageHeader from '../../../components/common/PageHeader/PageHeader';
import { useErpStore } from '../../../stores/erpStore';
import { fmtINR } from '../../../utils/formatters';
import styles from './CustomerProductMaster.module.scss';

export const CustomerProductMaster = () => {
  const { customers, products, createCustomer, createProduct } = useErpStore();
  const [tab, setTab] = useState('customers');
  const [isAddCustOpen, setIsAddCustOpen] = useState(false);
  const [isAddProdOpen, setIsAddProdOpen] = useState(false);

  // Customer Form
  const [custName, setCustName] = useState('');
  const [custContact, setCustContact] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custCity, setCustCity] = useState('');
  const [custGst, setCustGst] = useState('');
  const [custAddress, setCustAddress] = useState('');

  // Product Form
  const [prodName, setProdName] = useState('');
  const [prodCode, setProdCode] = useState('');
  const [prodModel, setProdModel] = useState('');
  const [prodPrice, setProdPrice] = useState(50000);
  const [prodCategory, setProdCategory] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  const handleCustSubmit = (e) => {
    e.preventDefault();
    createCustomer({
      name: custName,
      contact: custContact,
      phone: custPhone,
      email: custEmail,
      city: custCity,
      gst: custGst,
      address: custAddress
    });
    setIsAddCustOpen(false);
    setCustName('');
    setCustPhone('');
  };

  const handleProdSubmit = (e) => {
    e.preventDefault();
    createProduct({
      name: prodName,
      code: prodCode,
      model: prodModel,
      price: Number(prodPrice) || 0,
      category: prodCategory,
      description: prodDesc
    });
    setIsAddProdOpen(false);
    setProdName('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.toprow}>
          <div className={styles.topleft}>
            <PageHeader
              title="Master Records"
              subtitle="Centralized Client & Product Specifications"
              showBack
              actions={
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  onClick={() => (tab === 'customers' ? setIsAddCustOpen(true) : setIsAddProdOpen(true))}
                  sx={{ borderRadius: 2 }}
                >
                  {tab === 'customers' ? 'Add Customer' : 'Add Product'}
                </Button>
              }
            />
          </div>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(_, val) => setTab(val)}>
            <Tab label={`Customers (${customers.length})`} value="customers" sx={{ textTransform: 'none', fontWeight: 600 }} />
            <Tab label={`Products (${products.length})`} value="products" sx={{ textTransform: 'none', fontWeight: 600 }} />
          </Tabs>
        </Box>

        <div className={styles.middlerow}>
          {tab === 'customers' ? (
            <div className={styles.list}>
              {customers.map((c) => (
                <Card key={c.id} className={styles.card}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {c.name}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#1D4ED8' }}>
                        {c.id}
                      </Typography>
                    </Box>

                    <Typography variant="caption" color="text.secondary" display="block">
                      Contact: {c.contact} • {c.phone}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Email: {c.email} • GST: {c.gst}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                      Address: {c.address}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className={styles.list}>
              {products.map((p) => (
                <Card key={p.id} className={styles.card}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {p.name}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#1D4ED8' }}>
                        {p.code}
                      </Typography>
                    </Box>

                    <Typography variant="caption" color="text.secondary" display="block">
                      Model: {p.model} • Category: {p.category}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A', my: 0.5 }}>
                      Standard Price: {fmtINR(p.price)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {p.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Add Customer Dialog */}
        <Dialog open={isAddCustOpen} onClose={() => setIsAddCustOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>Add New Customer</DialogTitle>
          <form onSubmit={handleCustSubmit}>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Customer / Company Name" value={custName} onChange={(e) => setCustName(e.target.value)} required />
              <TextField label="Primary Contact Person" value={custContact} onChange={(e) => setCustContact(e.target.value)} required />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField label="Phone Number" value={custPhone} onChange={(e) => setCustPhone(e.target.value)} required />
                <TextField label="Email" type="email" value={custEmail} onChange={(e) => setCustEmail(e.target.value)} required />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField label="City" value={custCity} onChange={(e) => setCustCity(e.target.value)} required />
                <TextField label="GSTIN Number" value={custGst} onChange={(e) => setCustGst(e.target.value)} />
              </Box>
              <TextField label="Complete Address" value={custAddress} onChange={(e) => setCustAddress(e.target.value)} multiline rows={2} />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setIsAddCustOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">Save Customer</Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Add Product Dialog */}
        <Dialog open={isAddProdOpen} onClose={() => setIsAddProdOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ fontWeight: 700 }}>Add New Product Specification</DialogTitle>
          <form onSubmit={handleProdSubmit}>
            <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Product Name" value={prodName} onChange={(e) => setProdName(e.target.value)} required />
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField label="Product Code" value={prodCode} onChange={(e) => setProdCode(e.target.value)} placeholder="e.g. CRYO-INC100" required />
                <TextField label="Model Number" value={prodModel} onChange={(e) => setProdModel(e.target.value)} required />
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField type="number" label="Standard Price (₹)" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} required />
                <TextField label="Category" value={prodCategory} onChange={(e) => setProdCategory(e.target.value)} placeholder="e.g. Laboratory Equipment" />
              </Box>
              <TextField label="Technical Description" value={prodDesc} onChange={(e) => setProdDesc(e.target.value)} multiline rows={2} />
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={() => setIsAddProdOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">Save Product</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default CustomerProductMaster;
