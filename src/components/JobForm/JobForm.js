import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './JobForm.module.css';

const JobForm = ({ job = {}, onSave, onCancel }) => {
  const [company, setCompany] = useState(job.company || '');
  const [position, setPosition] = useState(job.position || '');
  const [salaryRange, setSalaryRange] = useState(job.salaryRange || '');
  const [status, setStatus] = useState(job.status || '');
  const [notes, setNotes] = useState(job.notes || '');

  useEffect(() => {
    setCompany(job.company || '');
    setPosition(job.position || '');
    setSalaryRange(job.salaryRange || '');
    setStatus(job.status || '');
    setNotes(job.notes || '');
  }, [job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = { company, position, salaryRange, status, notes };
    if (job._id) {
      await axios.put(`/api/jobs/${job._id}`, jobData);
    } else {
      await axios.post('/api/jobs', jobData);
    }
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Company:</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Position:</label>
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Salary Range:</label>
        <input
          type="text"
          value={salaryRange}
          onChange={(e) => setSalaryRange(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Status:</label>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={styles.textarea}
        ></textarea>
      </div>
      <div className={styles.buttonGroup}>
        <button 
        type="submit" 
        className={styles.button}>
        Save
        </button>
        <button 
        type="button" 
        onClick={onCancel} 
        className={`${styles.button} ${styles.cancelButton}`}>
        Cancel
        </button>
      </div>
    </form>
  );
};

export default JobForm;