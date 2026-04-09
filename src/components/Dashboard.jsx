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