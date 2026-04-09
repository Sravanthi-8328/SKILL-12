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