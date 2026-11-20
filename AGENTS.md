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

---

## 8. Backend Architecture, Database & API Rules (Phase 4+)

1. **Location & Structure**:
   - The backend lives strictly inside the `server/` directory.
   - Node.js ES Modules (`"type": "module"`), Express.js, MongoDB (Mongoose), Joi, JWT, bcryptjs.
   - Modular monolithic structure serving all departments: `controllers/`, `models/`, `routes/`, `services/`, `middleware/`, `utils/`, `validators/`.
2. **Document Numbering Invariance**:
   - **NEVER** generate document IDs using `Model.countDocuments() + 1`.
   - Always use the atomic counter sequence generator (`getNextSequence(prefix)` via `server/src/utils/counter.js`) to guarantee concurrency safety and prevent ID collisions.
3. **Inventory & Manufacturing Invariants**:
   - Creating a Purchase Order (PO) must **NOT** increment inventory.
   - Confirming a Goods Receipt Note (GRN) must increment `Material.currentStock` atomically and write an immutable `StockMovement` entry (`GRN_RECEIPT`).
   - Material Issue (MI) must decrement `Material.currentStock` atomically, write a `StockMovement` entry (`MATERIAL_ISSUE`), and strictly reject requests if available stock is insufficient.
   - Production Material Receipt confirms shopfloor physical handover and does **NOT** double-decrement warehouse inventory.
4. **ID vs Code Query Safety**:
   - Use `buildIdOrCodeQuery` (`server/src/utils/queryHelper.js`) for lookups by route parameter to safely handle human-readable codes (`SO-001`, `PRO-001`) without causing Mongoose `CastError` on non-ObjectId strings.
5. **Testing & Seeding**:
   - Every backend feature must be verified using Jest/Supertest (`npm test` inside `server/`).
   - Maintain the golden order demo dataset (`SO-001`, ABC Laboratory, Deep Freezer -80°C) callable via `npm run seed:demo`.
