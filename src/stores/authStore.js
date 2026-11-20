import { create } from 'zustand';
import { PERSONAS } from '../constants/personas';

export const useAuthStore = create((set, get) => ({
  personaKey: 'admin',
  currentPersona: PERSONAS.admin,
  isAuthenticated: true,
  activeDept: 'admin',

  setPersona: (key) => {
    const persona = PERSONAS[key] || PERSONAS.admin;
    const defaultDept = persona.isAdmin ? 'admin' : persona.depts[0] || 'sales';
    set({
      personaKey: key,
      currentPersona: persona,
      isAuthenticated: true,
      activeDept: defaultDept
    });
  },

  setActiveDept: (deptKey) => {
    const { currentPersona } = get();
    if (currentPersona.isAdmin || currentPersona.depts.includes(deptKey)) {
      set({ activeDept: deptKey });
    }
  },

  login: (email, _password) => {
    // Find matching persona or default to admin
    const found = Object.values(PERSONAS).find((p) => p.email.toLowerCase() === (email || '').toLowerCase());
    const persona = found || PERSONAS.admin;
    const defaultDept = persona.isAdmin ? 'admin' : persona.depts[0] || 'sales';
    set({
      personaKey: persona.key,
      currentPersona: persona,
      isAuthenticated: true,
      activeDept: defaultDept
    });
    return true;
  },

  logout: () => {
    set({
      isAuthenticated: false,
      activeDept: 'sales'
    });
  },

  canAccessDept: (deptKey) => {
    const { currentPersona, isAuthenticated } = get();
    if (!isAuthenticated) return false;
    if (deptKey === 'admin') return currentPersona.isAdmin;
    return currentPersona.isAdmin || currentPersona.depts.includes(deptKey);
  },

  canPerformAction: (deptKey, action) => {
    const { currentPersona } = get();
    if (currentPersona.isAdmin) return true;
    if (!currentPersona.perms || !currentPersona.perms[deptKey]) return false;
    return !!currentPersona.perms[deptKey][action];
  }
}));
