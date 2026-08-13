import { useEffect, useState } from 'react';

const buildApiUrl = (path) => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return `${baseUrl}${path}`;
};

const normalizeRecords = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== 'object') return [];

  const candidates = [
    payload.data,
    payload.results,
    payload.items,
    payload.data?.data,
    payload.data?.results,
    payload.data?.items,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate;
  }

  return [];
};

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/teams/'));
        if (!response.ok) {
          throw new Error(`Failed to load teams: ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeRecords(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading teams...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Teams</h2>
        <div className="row g-3">
          {teams.length > 0 ? (
            teams.map((team) => (
              <div key={team._id ?? team.id ?? team.name} className="col-md-6">
                <div className="border rounded p-3 h-100">
                  <h4>{team.name}</h4>
                  <p className="text-muted mb-2">{team.sport ?? 'Team sport'}</p>
                  <p className="mb-0">
                    Members: <strong>{team.members?.length ?? 0}</strong>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted py-3">No teams found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
