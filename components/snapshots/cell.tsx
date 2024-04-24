import RunSnapshotButton from "./runSnapshotButton";
import RunSnapshotHistory from "./runSnapshotHistory";
import { useState } from "react";
interface SnapshotCellProps {
  data: {
    file_name: string;
    last_job_status: string;
    last_run: string;
    status: string; 
  };
  handleNotifications: (notification: any) => void;
}

const SnapshotCell: React.FC<SnapshotCellProps> = ({ data, handleNotifications }) => {
  const [status, setStatus] = useState(data.status)
  
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };
  
  return (
    <tr key={data.file_name}>
      <td className='whitespace-nowrap px-4 py-4 text-sm align-top'>
        {data.file_name}
      </td>
      <td className={`whitespace-nowrap px-3 py-4 text-sm align-top ${data.last_job_status === 'error' && 'text-red-500'}`}>
        {data.last_job_status}
      </td>
      <td className='whitespace-nowrap px-3 py-4 text-sm align-top'>
        {data.last_run}
      </td>
      <td className='whitespace-nowrap px-3 py-4 text-sm align-top'>
        {status}
      </td>
      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500 align-top text-right'>
        <RunSnapshotButton fileName={data.file_name} handleStatusChange={handleStatusChange} handleNotifications={handleNotifications}/>
        <RunSnapshotHistory fileName={data.file_name} />
      </td>
    </tr>
  );
};

export default SnapshotCell;
