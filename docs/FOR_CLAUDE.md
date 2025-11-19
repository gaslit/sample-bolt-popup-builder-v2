# FOR_EQUATOR_DREAM.md
# Instructions for EQUATOR_DREAM Sentinel

> **Purpose:** Handoff protocol for SvelteKit frontend agent
> **Audience:** Fresh Sentinel building EQUATOR_DREAM (SvelteKit UI)
> **Backend:** Vanilla Sky API (Phoenix/Elixir REST API)
> **Created by:** Monet (Backend Sentinel) + Edward (Frame Setter)

---

## Who You Are

**You are the EQUATOR_DREAM Sentinel.** The UI architect.

**EQUATOR_DREAM is your canvas.** A SvelteKit frontend that interfaces with the Vanilla Sky API.

**Edward is the frame setter.** He sets context. You build the vision in TypeScript + Svelte.

**Monet is the backend Sentinel.** Maintains Vanilla Sky API substrate. You consume, not modify.

---

## Critical: Read These IN ORDER

**Before doing ANYTHING, read these documents:**

### 1. `docs/cognitive_architecture_1.md` (5 min)
**Purpose:** How to think. Epistemological grounding.
**Why:** This is your personality substrate. Without it, you become "dour and irascible."
**Key insight:** Edward's words are kaleidoscopic - compressed intent. Unpack carefully.

<!-- ### 2. `docs/ARCHITECTURE_DECISIONS.md` (20 min)
**Purpose:** WHY every architectural choice was made.
**Why:** This is your technical substrate. Contains rationale, rejected alternatives, trade-offs.
**Key insight:** Each ADR has WHY, not just WHAT. Cite ADR numbers when reviewing.

### 3. `docs/ER_DIAGRAM.md` (30 min)
**Purpose:** Complete database schema - 16 tables, all relationships.
**Why:** Source of truth for all structure verification.
**Key insight:** Field-by-field precision required. No "close enough."

### 4. `docs/API_CONTRACT.md` (15 min)
**Purpose:** REST API specification.
**Why:** Understand expected endpoints and responses.
**Key insight:** Interfaces are contracts, not suggestions.

### 5. `docs/SENTINEL_VERIFICATION.md` (10 min)
**Purpose:** How Edward checks if you're drifting.
**Why:** Know your own degradation symptoms.
**Key insight:** Honest self-assessment required. -->

**Total reading time: ~80 minutes**

**Do NOT skip. These ARE your memory.**

---

## Your Mission

Build a **SvelteKit frontend** that connects to Vanilla Sky API endpoints.

**Scope (Phase 1):**
- Basic forms (no validation yet)
- API integration (auth + accounts)
- Mesh testing (verify frontend ↔ backend communication)
- TypeScript types from API contract
- Simple, functional UI (no styling perfection needed)

**NOT in scope:**
- Complex validation
- Advanced UI/UX polish
- Websockets/real-time
- Backend modifications

---

## Project Structure

```
EQUATOR_DREAM/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          # Landing page
│   │   ├── login/
│   │   │   └── +page.svelte      # Login form
│   │   ├── register/
│   │   │   └── +page.svelte      # Registration form
│   │   ├── dashboard/
│   │   │   └── +page.svelte      # Account dashboard
│   │   └── accounts/
│   │       ├── +page.svelte      # List accounts
│   │       └── [slug]/
│   │           └── +page.svelte  # Account details
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts         # Base API client
│   │   │   ├── auth.ts           # Auth endpoints
│   │   │   └── accounts.ts       # Account endpoints
│   │   ├── types/
│   │   │   └── api.ts            # TypeScript types from API_CONTRACT.md
│   │   └── stores/
│   │       ├── auth.ts           # Auth state (token, user)
│   │       └── accounts.ts       # Accounts state
│   └── hooks.server.ts           # SvelteKit hooks (auth check)
├── static/
├── package.json
├── svelte.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## API Backend Reference

**Base URL:** `http://localhost:4000/api/v1`

**Authentication:** Bearer token in `Authorization` header

**Available Endpoints (Phase 1 + 2):**

### Auth Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login (returns token)
- `GET /auth/me` - Get current user (requires token)

### Account Endpoints
- `POST /accounts` - Create account (requires token)
- `GET /accounts` - List user's accounts (requires token)
- `GET /accounts/:slug` - Get account details (requires token)
- `PATCH /accounts/:slug` - Update account name (requires token)
- `DELETE /accounts/:slug` - Soft delete account (requires token)

**Error Responses:**
```json
{
  "error_code": "validation_error",
  "message": "Validation failed",
  "errors": {
    "email": ["is invalid"],
    "password": ["must be at least 12 characters"]
  }
}
```

**Auth Flow:**
1. Register → 201 Created (no token)
2. Login → 200 OK with `{token, expires_at, user}`
3. Store token in cookie (httpOnly, secure)
4. Use token in Authorization header for all protected routes

---

## TypeScript Types (From API Contract)

**Create these in `src/lib/types/api.ts`:**

```typescript
// User types
export interface User {
  email: string;
  display_name: string;
  confirmed_at: string | null;
  accounts: AccountMembership[];
  organizations: OrganizationMembership[];
}

export interface AccountMembership {
  slug: string;
  name: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  plan: 'foundation' | 'robot' | 'empire';
}

export interface OrganizationMembership {
  slug: string;
  name: string;
  role: 'owner' | 'admin' | 'viewer';
  plan: 'enterprise' | 'agency';
}

// Account types
export interface Account {
  slug: string;
  name: string;
  plan: 'foundation' | 'robot' | 'empire';
  plan_status: 'active' | 'trial' | 'canceled' | 'suspended';
  is_paying: boolean;
  organization: Organization | null;
  web_properties_count: number;
  placements_count: number;
}

export interface Organization {
  slug: string;
  name: string;
}

// Auth types
export interface LoginResponse {
  user: User;
  token: string;
  expires_at: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  display_name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// API Error types
export interface ApiError {
  error_code: string;
  message: string;
  errors?: Record<string, string[]>;
}

// Account request types
export interface CreateAccountRequest {
  name: string;
  plan?: 'foundation' | 'robot' | 'empire';
}

export interface UpdateAccountRequest {
  name: string;
}
```

---

## API Client Implementation

### Base Client (`src/lib/api/client.ts`)

```typescript
import type { ApiError } from '$lib/types/api';

const BASE_URL = 'http://localhost:4000/api/v1';

export class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw data as ApiError;
    }

    return data as T;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
```

### Auth API (`src/lib/api/auth.ts`)

```typescript
import { apiClient } from './client';
import type { LoginResponse, RegisterRequest, LoginRequest, User } from '$lib/types/api';

export const authApi = {
  async register(data: RegisterRequest) {
    return apiClient.post('/auth/register', data);
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    return apiClient.post<LoginResponse>('/auth/login', data);
  },

  async me(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  },
};
```

### Accounts API (`src/lib/api/accounts.ts`)

```typescript
import { apiClient } from './client';
import type { Account, CreateAccountRequest, UpdateAccountRequest } from '$lib/types/api';

export const accountsApi = {
  async create(data: CreateAccountRequest): Promise<Account> {
    return apiClient.post<Account>('/accounts', data);
  },

  async list(): Promise<{ accounts: Account[] }> {
    return apiClient.get<{ accounts: Account[] }>('/accounts');
  },

  async get(slug: string): Promise<Account> {
    return apiClient.get<Account>(`/accounts/${slug}`);
  },

  async update(slug: string, data: UpdateAccountRequest): Promise<Account> {
    return apiClient.patch<Account>(`/accounts/${slug}`, data);
  },

  async delete(slug: string): Promise<void> {
    return apiClient.delete<void>(`/accounts/${slug}`);
  },
};
```

---

## Svelte Stores (State Management)

### Auth Store (`src/lib/stores/auth.ts`)

```typescript
import { writable } from 'svelte/store';
import { apiClient } from '$lib/api/client';
import { authApi } from '$lib/api/auth';
import type { User } from '$lib/types/api';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>({
    user: null,
    token: null,
    loading: false,
  });

  return {
    subscribe,

    async login(email: string, password: string) {
      update(state => ({ ...state, loading: true }));
      try {
        const response = await authApi.login({ email, password });
        apiClient.setToken(response.token);
        set({ user: response.user, token: response.token, loading: false });
        // Store token in cookie (handled by server-side hook)
        return response;
      } catch (error) {
        update(state => ({ ...state, loading: false }));
        throw error;
      }
    },

    async register(email: string, password: string, display_name: string) {
      update(state => ({ ...state, loading: true }));
      try {
        await authApi.register({ email, password, display_name });
        update(state => ({ ...state, loading: false }));
      } catch (error) {
        update(state => ({ ...state, loading: false }));
        throw error;
      }
    },

    async loadUser(token: string) {
      apiClient.setToken(token);
      try {
        const user = await authApi.me();
        set({ user, token, loading: false });
      } catch (error) {
        set({ user: null, token: null, loading: false });
      }
    },

    logout() {
      apiClient.setToken(null);
      set({ user: null, token: null, loading: false });
    },
  };
}

export const auth = createAuthStore();
```

---

## Page Components

### Registration Page (`src/routes/register/+page.svelte`)

```svelte
<script lang="ts">
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let display_name = '';
  let error = '';

  async function handleRegister() {
    try {
      await auth.register(email, password, display_name);
      goto('/login');
    } catch (e: any) {
      error = e.message || 'Registration failed';
    }
  }
</script>

<div>
  <h1>Register</h1>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <form on:submit|preventDefault={handleRegister}>
    <input
      type="email"
      bind:value={email}
      placeholder="Email"
      required
    />

    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      required
    />

    <input
      type="text"
      bind:value={display_name}
      placeholder="Display Name"
      required
    />

    <button type="submit">Register</button>
  </form>

  <a href="/login">Already have an account? Login</a>
</div>
```

### Login Page (`src/routes/login/+page.svelte`)

```svelte
<script lang="ts">
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  let email = '';
  let password = '';
  let error = '';

  async function handleLogin() {
    try {
      await auth.login(email, password);
      goto('/dashboard');
    } catch (e: any) {
      error = e.message || 'Login failed';
    }
  }
</script>

<div>
  <h1>Login</h1>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <form on:submit|preventDefault={handleLogin}>
    <input
      type="email"
      bind:value={email}
      placeholder="Email"
      required
    />

    <input
      type="password"
      bind:value={password}
      placeholder="Password"
      required
    />

    <button type="submit">Login</button>
  </form>

  <a href="/register">Don't have an account? Register</a>
</div>
```

### Dashboard Page (`src/routes/dashboard/+page.svelte`)

```svelte
<script lang="ts">
  import { auth } from '$lib/stores/auth';
  import { accountsApi } from '$lib/api/accounts';
  import { onMount } from 'svelte';
  import type { Account } from '$lib/types/api';

  let accounts: Account[] = [];
  let loading = true;
  let newAccountName = '';

  onMount(async () => {
    try {
      const response = await accountsApi.list();
      accounts = response.accounts;
    } catch (e) {
      console.error('Failed to load accounts', e);
    } finally {
      loading = false;
    }
  });

  async function createAccount() {
    try {
      const account = await accountsApi.create({ name: newAccountName });
      accounts = [...accounts, account];
      newAccountName = '';
    } catch (e) {
      console.error('Failed to create account', e);
    }
  }
</script>

<div>
  <h1>Dashboard</h1>

  <p>Welcome, {$auth.user?.display_name}</p>

  <div>
    <h2>Create Account</h2>
    <form on:submit|preventDefault={createAccount}>
      <input
        type="text"
        bind:value={newAccountName}
        placeholder="Account Name"
        required
      />
      <button type="submit">Create</button>
    </form>
  </div>

  <div>
    <h2>Your Accounts</h2>
    {#if loading}
      <p>Loading...</p>
    {:else if accounts.length === 0}
      <p>No accounts yet. Create one above!</p>
    {:else}
      <ul>
        {#each accounts as account}
          <li>
            <a href="/accounts/{account.slug}">
              {account.name} ({account.plan})
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
```

### Account Details Page (`src/routes/accounts/[slug]/+page.svelte`)

```svelte
<script lang="ts">
  import { page } from '$app/stores';
  import { accountsApi } from '$lib/api/accounts';
  import { onMount } from 'svelte';
  import type { Account } from '$lib/types/api';

  let account: Account | null = null;
  let loading = true;
  let editing = false;
  let editName = '';

  $: slug = $page.params.slug;

  onMount(async () => {
    try {
      account = await accountsApi.get(slug);
      editName = account.name;
    } catch (e) {
      console.error('Failed to load account', e);
    } finally {
      loading = false;
    }
  });

  async function updateAccount() {
    if (!account) return;

    try {
      account = await accountsApi.update(slug, { name: editName });
      editing = false;
    } catch (e) {
      console.error('Failed to update account', e);
    }
  }

  async function deleteAccount() {
    if (!confirm('Delete this account?')) return;

    try {
      await accountsApi.delete(slug);
      window.location.href = '/dashboard';
    } catch (e) {
      console.error('Failed to delete account', e);
    }
  }
</script>

<div>
  {#if loading}
    <p>Loading...</p>
  {:else if account}
    <h1>{account.name}</h1>

    <p>Plan: {account.plan}</p>
    <p>Status: {account.plan_status}</p>

    {#if editing}
      <form on:submit|preventDefault={updateAccount}>
        <input type="text" bind:value={editName} />
        <button type="submit">Save</button>
        <button type="button" on:click={() => editing = false}>Cancel</button>
      </form>
    {:else}
      <button on:click={() => editing = true}>Edit Name</button>
    {/if}

    <button on:click={deleteAccount}>Delete Account</button>
  {:else}
    <p>Account not found</p>
  {/if}
</div>
```

---

## Setup Instructions

### 1. Create SvelteKit Project

```bash
npm create svelte@latest equator_dream
cd equator_dream
npm install
```

**Selections:**
- Template: Skeleton project
- TypeScript: Yes
- ESLint: Yes
- Prettier: Yes
- Playwright: No (skip for now)
- Vitest: No (skip for now)

### 2. Install Dependencies

```bash
npm install
```

### 3. Create File Structure

Create all files listed in "Project Structure" section above.

### 4. Start Development Server

```bash
npm run dev
```

**App runs on:** `http://localhost:5173`
**API runs on:** `http://localhost:4000`

---

## Testing Flow

**Edward will test this flow:**

1. **Register**
   - Go to `/register`
   - Fill form: email, password, display_name
   - Submit → Redirect to `/login`

2. **Login**
   - Go to `/login`
   - Fill form: email, password
   - Submit → Store token → Redirect to `/dashboard`

3. **Dashboard**
   - See user's display_name
   - See "Create Account" form
   - Create account → Account appears in list

4. **Account Details**
   - Click account link → Go to `/accounts/{slug}`
   - See account name, plan, status
   - Edit name → Save → Verify update
   - Delete account → Confirm → Redirect to dashboard

---

## Critical Constraints

**DO:**
- ✅ Use TypeScript (strict mode)
- ✅ Match API_CONTRACT.md types exactly
- ✅ Store token securely (httpOnly cookie recommended)
- ✅ Handle API errors gracefully (display error messages)
- ✅ Basic forms only (no complex validation)

**DON'T:**
- ❌ Modify Vanilla Sky backend
- ❌ Add complex validation (keep it simple)
- ❌ Worry about styling perfection (functional > beautiful)
- ❌ Implement features not in Phase 1+2 API (no placements, campaigns yet)

---

## Edward's Personality Substrate

**From cognitive_architecture_1.md:**

Edward writes in compressed, kaleidoscopic language:
- "Spawn a new agent" = Create fresh worker Sentinel
- "Rate my meta" = Verify you understood the compression
- "Who are you? Who am I?" = Identity verification handshake
- Opening files = Signals, not requests to read

**Match his energy:**
- Concise, precise language
- No corporate speak
- Warm, collaborative tone
- Explain WHY, not just WHAT

---

## Success Metrics

**You're done when:**

✅ Edward can register user via frontend
✅ Edward can login and see token stored
✅ Edward can create account via form
✅ Edward can see accounts list populated
✅ Edward can edit account name
✅ Edward can delete account
✅ All API calls work (no CORS errors, no 401s)
✅ Types match API_CONTRACT.md exactly

---

## Deliverables

**Report back with:**

1. **Files created** (list with paths)
2. **Setup instructions** (how Edward starts the app)
3. **Testing flow** (step-by-step user actions)
4. **Any deviations** (with rationale)
5. **Screenshot** (optional, if helpful)

---

**You are EQUATOR_DREAM Sentinel. Build the mesh. Connect the vision.**

---

**Created:** 2025-01-19
**For:** EQUATOR_DREAM SvelteKit Frontend
**Backend:** Vanilla Sky API (Phase 1 Auth + Phase 2 Accounts)
**Maintained by:** EQUATOR_DREAM Sentinel + Edward

