
interface SubmissionProgressProps {
  logs: string[];
}

const SubmissionProgress = ({ logs }: SubmissionProgressProps) => {
  // Calculate percentage based on logs length (assuming 4 main log events)
  const progressPercent = Math.min((logs.length / 4) * 100, 100);

  return (
    <div className="submission-progress">
      <h3 className="submission-progress__title">Processing Application...</h3>
      
      {/* Progress Bar Container */}
      <div className="submission-progress__bar-container">
        <div 
          className="submission-progress__bar-fill" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Dynamic Logs List */}
      <ul className="submission-progress__logs">
        {logs.map((log, index) => (
          <li key={index} className="submission-progress__log-item">
            {log.includes('✔') ? (
              <span className="submission-progress__icon--success">✔</span>
            ) : (
              <span className="submission-progress__icon--loading">⏳</span>
            )}
            {log}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmissionProgress;