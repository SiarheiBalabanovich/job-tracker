"use client";

import { useState, useEffect } from 'react';
import JobTable from '../components/JobTable/JobTable';
import JobForm from '../components/JobForm/JobForm';
import axios from 'axios';
import styles from './page.module.css';

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    // Загрузка списка вакансий
    axios.get('/api/jobs').then((response) => setJobs(response.data));
  }, []);

  const handleSave = () => {
    // Обновление списка вакансий
    axios.get('/api/jobs').then((response) => setJobs(response.data));
    setCurrentJob(null);
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
          <button className={styles.addButton} onClick={() => setCurrentJob({})}>
            + Add New Job
          </button>
          <JobTable jobs={jobs} onEdit={handleEdit} />
        </>
      )}
    </div>
  );
};

export default HomePage;