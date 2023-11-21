import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ApplyJob from '../jobs/Applyjob';
import './Dashboard.css';
import handleError from '../../utils/errorHandler';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({ userDashboard: [], appliedJobs: [] });
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/dashboard');
      setDashboardData(response.data);
      setError(null);
    } catch (error) {
      setError(handleError(error, 'Failed to fetch dashboard data. Please try again later.'));
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleApplySuccess = () => {
    fetchDashboardData();
    setApplicationSuccess(true);
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">User Dashboard</h2>
      {error && <p className="error-message">{error}</p>}
      {applicationSuccess && <p className="success-message">Application successful!</p>}
      <div className="jobs-container">
        <h3 className="jobs-title">All Jobs</h3>
        <ul className="jobs-list">
          {dashboardData.userDashboard.map((job) => (
            <li key={job.id} className="job-item">
              <div className="job-details">
                <h4>{job.title}</h4>
                <p>{job.description}</p>
                <p>Salary: ${job.salary}</p>
                <p>Location: {job.location}</p>
                {job.id && (
                  <Link to={`/${job.id}`} className="job-detail-link">
                    View Details
                  </Link>
                )}
              </div>
              <ApplyJob jobId={job.id} appliedJobs={dashboardData.appliedJobs} onApplySuccess={handleApplySuccess} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
