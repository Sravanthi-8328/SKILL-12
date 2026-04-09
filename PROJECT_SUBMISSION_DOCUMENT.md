# News Portal React Project - Code and Outputs Document

## Student / Workbook Context
- Course tags: 24SDCS02 / 24SDCS02E / 24SDCS02P / 24SDCS02L
- Project: News Portal Data Demo (React + fetch + axios + local JSON + hyperlink navigation)

## Included Source Code Files

### File: .gitignore

~~~text
node_modules
dist
.DS_Store
.env
.env.local
.vite
~~~

### File: README.md

~~~text
# News Portal React Data Demo

This React app demonstrates:

- `fetch()` from a local JSON file in `public/users.json`
- `fetch()` from JSONPlaceholder
- `axios` from a fake API with refresh and filter support
- navigation through hyperlinks using `HashRouter`

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
~~~

### File: index.html

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>News Portal Data Demo</title>
    <meta name="description" content="React demo for fetching local JSON, public API, and fake API data." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
~~~

### File: package.json

~~~json
{
  "name": "news-portal-react-fetch-demo",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "axios": "^1.8.4",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.2.1"
  }
}
~~~

### File: vite.config.js

~~~javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()]
});
~~~


~~~json
[
  {
    "id": 1,
    "name": "Aarav Sharma",
    "email": "aarav.sharma@example.com",
    "phone": "+91 98765 43210"
  },
  {
    "id": 2,
    "name": "Diya Patel",
    "email": "diya.patel@example.com",
    "phone": "+91 98765 43211"
  },
  {
    "id": 3,
    "name": "Kabir Singh",
    "email": "kabir.singh@example.com",
    "phone": "+91 98765 43212"
  },
  {
    "id": 4,
    "name": "Meera Iyer",
    "email": "meera.iyer@example.com",
    "phone": "+91 98765 43213"
  },
  {
    "id": 5,
    "name": "Rohan Gupta",
    "email": "rohan.gupta@example.com",
    "phone": "+91 98765 43214"
  },
  {
    "id": 6,
    "name": "Sara Khan",
    "email": "sara.khan@example.com",
    "phone": "+91 98765 43215"
  }
]
~~~

### File: src/main.jsx

~~~jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
~~~

### File: src/App.jsx

~~~jsx
import { HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import LocalUserList from './components/LocalUserList';
import UserList from './components/UserList';
import FakePostList from './components/FakePostList';

export default function App() {
  return (
    <HashRouter>
      <div className="app-shell">
        <header className="app-header">
          <div>
            <p className="eyebrow">24SDCS02 / 24SDCS02E / 24SDCS02P / 24SDCS02L</p>
            <h1>News Portal Data Demo</h1>
            <p className="subtitle">
              React practice for local JSON, public API, and fake API data loading with navigation.
            </p>
          </div>
          <Link className="home-link" to="/">
            Home
          </Link>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/local-users" element={<LocalUserList />} />
            <Route path="/users-api" element={<UserList />} />
            <Route path="/fake-api-posts" element={<FakePostList />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
~~~

### File: src/components/Dashboard.jsx

~~~jsx
import { Link } from 'react-router-dom';

const cards = [
  {
    to: '/local-users',
    title: 'Local Users',
    description: 'Load user records from public/users.json using fetch().' 
  },
  {
    to: '/users-api',
    title: 'Users API',
    description: 'Fetch users from JSONPlaceholder with loading and error handling.'
  },
  {
    to: '/fake-api-posts',
    title: 'Fake API Posts',
    description: 'Fetch products with axios and filter them by category.'
  }
];

export default function Dashboard() {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Dashboard</h2>
        <p>Open each component through hyperlinks instead of rendering everything in App.js.</p>
      </div>

      <div className="dashboard-grid">
        {cards.map((card) => (
          <Link key={card.to} to={card.to} className="nav-card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <span>Open section</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
~~~

### File: src/components/LocalUserList.jsx

~~~jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function LocalUserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('/users.json', { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Failed to load local users (${response.status})`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Something went wrong while loading local users.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadUsers();

    return () => controller.abort();
  }, []);

  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <h2>Local Users</h2>
          <p>Data is loaded from the public folder using fetch().</p>
        </div>
        <Link className="back-link" to="/">Back to dashboard</Link>
      </div>

      {loading ? <div className="status-box">Loading local users...</div> : null}
      {error ? <div className="status-box error">{error}</div> : null}

      {!loading && !error ? (
        <div className="card-grid">
          {users.map((user) => (
            <article className="data-card" key={user.id}>
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
~~~

### File: src/components/UserList.jsx

~~~jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        setLoading(true);
        setError('');

        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`Failed to load users (${response.status})`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Something went wrong while loading users.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadUsers();

    return () => controller.abort();
  }, []);

  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <h2>Users API</h2>
          <p>Data is fetched from JSONPlaceholder using fetch().</p>
        </div>
        <Link className="back-link" to="/">Back to dashboard</Link>
      </div>

      {loading ? <div className="status-box">Loading API users...</div> : null}
      {error ? <div className="status-box error">{error}</div> : null}

      {!loading && !error ? (
        <div className="card-grid">
          {users.map((user) => (
            <article className="data-card" key={user.id}>
              <h3>{user.name}</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
~~~

### File: src/components/FakePostList.jsx

~~~jsx
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function FakePostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshCount, setRefreshCount] = useState(0);

  useEffect(() => {
    let ignoreResponse = false;

    async function loadPosts() {
      try {
        setLoading(true);
        setError('');

        const response = await axios.get('https://fakestoreapi.com/products');
        if (!ignoreResponse) {
          setPosts(response.data);
        }
      } catch (apiError) {
        if (!ignoreResponse) {
          setError(apiError.message || 'Something went wrong while loading fake API posts.');
        }
      } finally {
        if (!ignoreResponse) {
          setLoading(false);
        }
      }
    }

    loadPosts();

    return () => {
      ignoreResponse = true;
    };
  }, [refreshCount]);

  const categories = useMemo(() => {
    return ['all', ...new Set(posts.map((post) => post.category))];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') {
      return posts;
    }

    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  function handleRefresh() {
    setRefreshCount((count) => count + 1);
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <h2>Fake API Posts</h2>
          <p>Axios loads data from fakestoreapi.com and a dropdown filters by category.</p>
        </div>
        <Link className="back-link" to="/">Back to dashboard</Link>
      </div>

      <div className="toolbar">
        <label className="filter-group">
          <span>Category filter</span>
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <button className="refresh-button" type="button" onClick={handleRefresh}>
          Refresh data
        </button>
      </div>

      {loading ? <div className="status-box">Loading fake API data...</div> : null}
      {error ? <div className="status-box error">{error}</div> : null}

      {!loading && !error ? (
        <div className="card-grid products-grid">
          {filteredPosts.map((post) => (
            <article className="data-card product-card" key={post.id}>
              <p className="category-tag">{post.category}</p>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p className="price">${post.price}</p>
            </article>
          ))}
        </div>
      ) : null}

      {!loading && !error && filteredPosts.length === 0 ? (
        <div className="status-box">No items match the selected category.</div>
      ) : null}
    </section>
  );
}
~~~

### File: src/styles.css

~~~css
:root {
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #102033;
  background:
    radial-gradient(circle at top left, rgba(40, 89, 187, 0.2), transparent 30%),
    radial-gradient(circle at right top, rgba(235, 123, 63, 0.18), transparent 28%),
    linear-gradient(180deg, #f7f9fc 0%, #eef3f8 100%);
  line-height: 1.5;
  font-weight: 400;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  min-height: 100%;
  margin: 0;
}

body {
  min-height: 100vh;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
select {
  font: inherit;
}

.app-shell {
  width: min(1180px, calc(100vw - 32px));
  margin: 0 auto;
  padding: 32px 0 48px;
}

.app-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  padding: 28px 32px;
  margin-bottom: 24px;
  border: 1px solid rgba(16, 32, 51, 0.08);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(18px);
  box-shadow: 0 18px 40px rgba(16, 32, 51, 0.08);
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #5b6980;
}

.app-header h1,
.panel-head h2,
.nav-card h3,
.data-card h3 {
  margin: 0;
}

.subtitle,
.panel-head p,
.nav-card p,
.data-card p {
  margin: 8px 0 0;
  color: #536174;
}

.home-link,
.back-link,
.nav-card,
.refresh-button {
  border-radius: 16px;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

.home-link,
.back-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  background: #102033;
  color: #fff;
  box-shadow: 0 12px 24px rgba(16, 32, 51, 0.2);
}

.home-link:hover,
.back-link:hover,
.nav-card:hover,
.refresh-button:hover {
  transform: translateY(-2px);
}

.app-main {
  display: grid;
  gap: 24px;
}

.panel {
  padding: 28px;
  border: 1px solid rgba(16, 32, 51, 0.08);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 18px 40px rgba(16, 32, 51, 0.08);
}

.panel-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 20px;
}

.dashboard-grid,
.card-grid {
  display: grid;
  gap: 16px;
}

.dashboard-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.card-grid {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.nav-card,
.data-card,
.status-box {
  border: 1px solid rgba(16, 32, 51, 0.08);
  background: #fff;
}

.nav-card {
  display: block;
  padding: 20px;
  box-shadow: 0 14px 24px rgba(16, 32, 51, 0.06);
}

.nav-card span {
  display: inline-block;
  margin-top: 18px;
  font-weight: 600;
  color: #1f5eff;
}

.data-card {
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 14px 24px rgba(16, 32, 51, 0.06);
}

.status-box {
  padding: 16px 18px;
  margin-bottom: 16px;
  border-radius: 16px;
  color: #102033;
}

.status-box.error {
  color: #8f1d1d;
  background: #fff3f3;
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.filter-group {
  display: grid;
  gap: 8px;
  min-width: 220px;
}

.filter-group span {
  font-size: 0.92rem;
  font-weight: 600;
}

.filter-group select {
  padding: 12px 14px;
  border: 1px solid rgba(16, 32, 51, 0.16);
  border-radius: 14px;
  background: #fff;
  color: #102033;
}

.refresh-button {
  padding: 12px 18px;
  border: 0;
  background: linear-gradient(135deg, #1f5eff, #0f8df0);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(31, 94, 255, 0.24);
}

.products-grid {
  align-items: stretch;
}

.product-card {
  display: grid;
  gap: 12px;
}

.category-tag {
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  margin: 0;
  border-radius: 999px;
  background: #eef4ff;
  color: #1f5eff;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: capitalize;
}

.price {
  margin-top: auto;
  font-size: 1.1rem;
  font-weight: 800;
  color: #102033;
}

@media (max-width: 720px) {
  .app-shell {
    width: min(100vw - 20px, 1180px);
    padding-top: 10px;
  }

  .app-header,
  .panel-head,
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .home-link,
  .back-link,
  .refresh-button,
  .filter-group select {
    width: 100%;
  }
}
~~~

## Captured Outputs (As Provided)

### Output 1 - Local Users Page
- Header shown: News Portal Data Demo
- Section shown: Local Users
- Data displayed from local users.json with cards containing name, email, and phone for 6 users.

### Output 2 - Users API Page (JSONPlaceholder)
- Header shown: News Portal Data Demo
- Section shown: Users API
- Multiple user cards rendered from https://jsonplaceholder.typicode.com/users with name, email, and phone.

### Output 3 - Fake API Posts Page
- Header shown: News Portal Data Demo
- Section shown: Fake API Posts
- Category filter dropdown visible
- Refresh data button visible
- Current captured run shows: Network Error message (API/network accessibility issue in that run).

## Build and Run Result Snapshot
- Build command executed successfully using Vite production build.
- Dev server also started successfully at http://localhost:5173/ during testing.

## GitHub Repository Link
https://github.com/Sravanthi-8328/SKILL-12.git
