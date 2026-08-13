import { useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

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

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Failed to load activities: ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeRecords(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading activities...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="mb-3">Activities</h2>
        <div className="table-responsive">
          <table className="table table-striped mb-0 align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <tr key={activity._id ?? activity.id ?? activity.date ?? activity.type}>
                    <td>{activity.type}</td>
                    <td>{activity.durationMinutes ?? 'N/A'} min</td>
                    <td>{activity.caloriesBurned ?? 'N/A'}</td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No activities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
