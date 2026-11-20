# AGENTS.md – Cryo Enterprise ERP Development Rules

This document outlines the mandatory rules, conventions, and workflows for all AI agents and engineers working on the Cryo Enterprise ERP frontend project.

---

## 1. Single Source of Truth: `project.md`

`project.md` in the repository root is the persistent project memory. It documents what has actually been implemented, architectural decisions, component specifications, and current progress.

### Mandatory Workflow for Every Task

```text
Read project.md
       ↓
Understand current implementation
       ↓
Inspect relevant existing files
       ↓
Check components and utilities
       ↓
Plan the smallest clean solution
       ↓
Implement changes
       ↓
Test and verify changes (lint, build, UI test)
       ↓
Fix discovered issues
       ↓
Update project.md
       ↓
Confirm documentation is accurate
```

- **NEVER** make undocumented changes.
- **NEVER** claim APIs, backend services, or authentications are implemented when they are only mocked.
- Always record changes in `project.md` with the real date and affected files.

---

## 2. Mandatory Technology Stack

Use:
- **React** (v18+)
- **Vite** (Build tool)
- **JavaScript & JSX** (Do NOT use TypeScript!)
- **Material UI (MUI)** (`@mui/material`, `@emotion/react`, `@emotion/styled`)
- **Google Material Icons** (`@mui/icons-material`)
- **SCSS** (`sass`)
- **SCSS Modules** (`.module.scss`)
- **Google Fonts** (`Inter`)
- **React Router DOM** (`react-router-dom` v6+)
- **Zustand** (Shared state management)
- **Axios** (Future API client architecture)
- **React Hook Form** (Complex forms)

### Strictly Forbidden Technologies
- **NO** React Native or Expo (This is a web mobile-first responsive React app)
- **NO** Next.js
- **NO** TypeScript
- **NO** Tailwind CSS
- **NO** Bootstrap
- **NO** Styled Components / Emotion css prop / Custom CSS-in-JS
- **NO** Inline CSS for normal component styling
- **NO** Lucide Icons, Font Awesome, React Icons, Hero Icons (Use Material Icons only)

---

## 3. Mandatory Component Folder Structure

Every visual component MUST have its own dedicated directory containing its JSX file and SCSS module:

```text
ComponentName/
├── ComponentName.jsx
└── ComponentName.module.scss
```

Import convention:
```jsx
import styles from "./ComponentName.module.scss";
```

Services, hooks, stores, and utilities do NOT require SCSS files.

---

## 4. Mandatory Component Layout Convention

Use the standard layout naming convention wherever applicable:

```text
.container
└── .wrapper
    ├── .toprow
    │   ├── .topleft
    │   ├── .topcenter
    │   └── .topright
    ├── .middlerow
    │   ├── .middleleft
    │   ├── .middlecenter
    │   └── .middleright
    └── .bottomrow
        ├── .bottomleft
        ├── .bottomcenter
        └── .bottomright
```

Corresponding SCSS:
```scss
.container {
  .wrapper {
    .toprow {
      .topleft { }
      .topcenter { }
      .topright { }
    }
    .middlerow {
      .middleleft { }
      .middlecenter { }
      .middleright { }
    }
    .bottomrow {
      .bottomleft { }
      .bottomcenter { }
      .bottomright { }
    }
  }
}
```

Use only the sub-elements required by each component; do not render empty markup.

---

## 5. UI, Styling & Responsive Rules

1. **MUI Usage**: Prefer standard MUI components (`Box`, `Stack`, `Grid`, `Button`, `TextField`, `IconButton`, `Typography`, `Card`, `Dialog`, `Drawer`, `Menu`, `Tooltip`, `Table`, `Select`, `Autocomplete`, `Checkbox`, `Radio`, `Switch`, `Tabs`, `Snackbar`, `Alert`, `CircularProgress`, `Skeleton`).
2. **SCSS Modules**: Use SCSS Modules for all custom layouts, spacing, card stylings, and component-specific visuals. Avoid repetitive MUI `sx` props.
3. **Typography**: Google Font `Inter` across all components.
4. **Mobile-First & Responsive Breakpoints**:
   - Small Mobile: 320px - 375px
   - Mobile: 390px - 480px
   - Tablet: 768px - 1024px
   - Laptop / Desktop: 1024px - 1440px
   - Large Desktop: 1920px
   - Mobile preserves the compact card layout and fixed bottom navigation.
   - Tablet/Desktop adapt via CSS Grid / Flexbox without horizontal overflow.
5. **Overflow & Overlap Prevention**:
   - Never allow unwanted page-level horizontal overflow (`overflow-x: hidden`).
   - Sticky bottom nav must have bottom padding on scrollable containers (`padding-bottom: 72px`).
   - Text wrapping for long names, IDs, numbers, and emails (`text-overflow: ellipsis`, `word-break: break-word`).

---

## 6. Development Mock Authentication & Data Architecture

- No backend exists in this phase.
- Use Zustand for development mock authentication and ERP data.
- Provide mock personas:
  - Admin (Priya Nair, full access to all 5 departments)
  - Multi-dept Employee (Arun Kumar, Sales full + Production view-only)
  - Single-dept Employee (Murugan S, Supply Chain only)
  - View-Only Employee (Ramesh Viewer, read-only)
  - Draft User (Kavya Drafts, create/edit only, no workflow transitions)
- Admin can access all departments and return via the persistent `[Return to Admin Dashboard]` banner.
- All departments share single-source-of-truth mock entities (Customers, Products, Orders, Materials, Suppliers, Inventory, Deliveries).
- All API calls are simulated locally and marked as `pending` backend contract.

---

## 7. Preservation of Design References

- The `design/` folder is read-only.
- **NEVER** delete, modify, or overwrite original HTML design references.
