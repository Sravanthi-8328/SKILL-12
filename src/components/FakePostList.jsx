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