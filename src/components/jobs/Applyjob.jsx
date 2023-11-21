import React, { useState } from 'react';
import axios from 'axios';

const ApplyJob = ({ jobId, appliedJobs, onApplySuccess }) => {
  const [resumeFile, setResumeFile] = useState(null);

  const handleApply = async () => {
    try {
      if (!resumeFile) {
        console.error('Resume not found');
        return;
      }

      const formData = new FormData();
      formData.append('resume', resumeFile);

      await axios.post(`http://localhost:5000/${jobId}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      onApplySuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const isAlreadyApplied = appliedJobs.some((appliedJob) => appliedJob.id === jobId && appliedJob.status);
  const isFileChooseDisabled = isAlreadyApplied;

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={isFileChooseDisabled} />
      <button onClick={handleApply} disabled={isAlreadyApplied}>
        {isAlreadyApplied ? <span>Applied</span> : <span>Apply</span>}
      </button>
    </div>
  );
};

export default ApplyJob;
