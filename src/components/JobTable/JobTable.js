import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './JobTable.module.css';

const JobTable = ({ onEdit }) => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/jobs').then(response => setJobs(response.data));
  }, []);

  const deleteJob = (id) => {
    axios.delete(`/api/jobs/${id}`).then(() => {
      setJobs(jobs.filter(job => job._id !== id));
    });
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
          {jobs.map(job => (
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