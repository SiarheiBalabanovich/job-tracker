import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './JobTable.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const JobTable = ({ onEdit }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/jobs/${id}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error('Failed to delete job:', error);
      alert('Failed to delete job. Please try again.');
    }
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell}>Company</th>
            <th className={styles.headerCell}>Position</th>
            <th className={styles.headerCell}>Salary Range</th>
            <th className={styles.headerCell}>Status</th>
            <th className={styles.headerCell}>Notes</th>
            <th className={styles.headerCell}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td className={styles.cell}>{job.company}</td>
              <td className={styles.cell}>{job.position}</td>
              <td className={styles.cell}>{job.salaryRange}</td>
              <td className={styles.cell}>{job.status}</td>
              <td className={styles.cell}>{job.notes}</td>
              <td className={styles.cell}>
                <button className={styles.button} onClick={() => onEdit(job)}>Edit</button>
                <button className={styles.button} onClick={() => deleteJob(job._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;