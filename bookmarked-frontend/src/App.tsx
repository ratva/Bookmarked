import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

function App() {
  const [count, setCount] = useState(0)
  const [health, setHealth] = useState<{ postgres?: string; neo4j?: string }>({})
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState<{ postgres?: string; neo4j?: string }>({})

  useEffect(() => {
    setLoading(true)
    Promise.allSettled([
      fetch(`${API_URL}/health/postgres`).then(res => res.text()),
      fetch(`${API_URL}/health/neo4j`).then(res => res.text()),
    ]).then(results => {
      const [postgresResult, neo4jResult] = results
      const newHealth: { postgres?: string; neo4j?: string } = {}
      const newErrors: { postgres?: string; neo4j?: string } = {}

      if (postgresResult.status === 'fulfilled') {
        const value = postgresResult.value as string;
        if (value.startsWith('PostgreSQL is UP')) {
          newHealth.postgres = 'UP';
        } else if (value.startsWith('PostgreSQL is DOWN:')) {
          newHealth.postgres = 'DOWN';
          newErrors.postgres = 'Postgres: ' + value.substring('PostgreSQL is DOWN: '.length);
        }
      } else {
        newErrors.postgres = 'Postgres: ' + (postgresResult.reason?.message || 'Failed');
      }

      if (neo4jResult.status === 'fulfilled') {
        const value = neo4jResult.value as string;
        if (value.startsWith('Neo4j is UP')) {
          newHealth.neo4j = 'UP';
        } else if (value.startsWith('Neo4j is DOWN:')) {
          newHealth.neo4j = 'DOWN';
          newErrors.neo4j = 'Neo4j: ' + value.substring('Neo4j is DOWN: '.length);
        }
      } else {
        newErrors.neo4j = 'Neo4j: ' + (neo4jResult.reason?.message || 'Failed');
      }

      setHealth(newHealth)
      setErrors(newErrors)
    }).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{ margin: '2em 0' }}>
        <h2>Backend Health Check</h2>
        {loading && <div>Loading...</div>}
        {Object.values(errors).length > 0 && (
          <div style={{ color: 'red' }}>
            {Object.values(errors)
              .filter(Boolean)
              .map((err, idx) => (
                <div key={idx}>{err}</div>
              ))}
          </div>
        )}
        {!loading && !errors && (
          <>
            <div>Postgres: {health.postgres}</div>
            <div>Neo4j: {health.neo4j}</div>
          </>
        )}
      </div>
    </>
  )
}

export default App
