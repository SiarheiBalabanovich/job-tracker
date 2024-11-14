"use client";

import { useState, useEffect } from 'react';
import JobTable from '../components/JobTable/JobTable';
import JobForm from '../components/JobForm/JobForm';
import axios from 'axios';
import styles from './page.module.css';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    // Загрузка списка вакансий
    axios.get(`${API_BASE_URL}/api/jobs`)
      .then((response) => setJobs(response.data))
      .catch((error) => console.error('Failed to fetch jobs:', error));
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/jobs`);
      setJobs(response.data);
      setCurrentJob(null);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const handleEdit = (job) => {
    setCurrentJob(job);
  };

  const handleCancel = () => {
    setCurrentJob(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Job Tracker</h1>
      {currentJob ? (
        <JobForm job={currentJob} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <button className={styles.addButton} onClick={() => setCurrentJob({ company: '', position: '', salaryRange: '', status: '', notes: '' })}>
            + Add New Job
          </button>
          <JobTable jobs={jobs} onEdit={handleEdit} />
        </>
      )}
    </div>
  );
};

export default HomePage;