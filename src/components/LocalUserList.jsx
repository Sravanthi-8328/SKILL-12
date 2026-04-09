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