# FILTER BUILDER UI

[Live Demo](https://itromy.github.io/Filter-Builder-UI/)

---

## Quick Start

### Requirements
- Node.js version > 20.19+

### Install
Install dependencies:

```bash
npm i
```

### Run the App
```bash
npm run dev
```

### Run Tests
```bash
npm run test
```

---

## Features

- Build complex filters with **AND/OR** conditions.
- Configurable **fields** and **operators** via JSON (`config/fields.json` & `config/operators.json`).
- Copy/paste filter JSON in the editor.
- React + TypeScript + Vite based UI.

---

## How To Use

### 1. Configure Fields
Define selectable fields in `config/fields.json`:

```json
[
  { "label": "Name", "value": "name", "type": "string" },
  { "label": "Age", "value": "age", "type": "number" },
  { "label": "Birthday", "value": "birthday", "type": "date" },
  { "label": "Active", "value": "isActive", "type": "boolean" }
]
```

### 2. Configure Operators
Define operators per type in `config/operators.json`:

```json
{
  "string": ["equals", "not_equals", "contains", "starts_with"],
  "number": ["equals", "not_equals", "greater_than", "less_than"],
  "date": ["before", "after", "on"],
  "boolean": ["equals", "not_equals"]
}
```

### 3. Build Filters in UI
- Select fields and operators to create conditions.
- Combine conditions using **AND/OR** groups.
- Copy or paste JSON into the editor (**only works with fields/operators from config**).

## Not Implemented Yet

- Operators requiring multiple values (`between`, `in`)
- Validation of conflicting conditions (e.g., `age > 30` and `age < 10`)
- registration of validation functions for operators
- Get/Post mode
- Advanced accessibility
- Integration tests
- UI is **not fully responsive**.
- Works only with **fields and operators defined in the config folder**.
