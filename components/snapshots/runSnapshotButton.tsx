import React from "react";

interface RunSnapshotButtonProps {
  fileName: string;
  handleStatusChange: (newStatus: string) => void;
  handleNotifications: (notification: any) => void;
}

const RunSnapshotButton: React.FC<RunSnapshotButtonProps> = ({ fileName, handleStatusChange, handleNotifications }) => {
  const handleRunClick = async () => {
    try {
      const response = await fetch(`/api/percy/snapshots/${fileName}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'running' }),
      });

      if (response.ok) {
        console.log('status changed');
        handleStatusChange('running');
      } else {
        const errorData = await response.json();
        handleNotifications({ error: errorData.error || 'Failed to change status as running' });
      }
    } catch (error) {
      handleNotifications({ error: 'Failed to change status as running' })
    } 

    try {
      const response = await fetch('/api/percy/snapshots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName }),
      });

      if (response.ok) {
        console.log('Percy job enqueued');
      } else {
        console.error('Failed to enqueue Percy job');
      }
    } catch (error) {
      handleNotifications({ error: (error as Error).message || 'Error running Percy job' });
    } 
  };

  return (
    <button
      type='button'
      className={`rounded-md bg-indigo-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2`}
      onClick={handleRunClick}
    >
      Run
    </button>
  );
};
export default RunSnapshotButton;

