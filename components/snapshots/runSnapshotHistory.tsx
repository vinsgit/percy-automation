import { useRouter } from 'next/router';

interface RunSnapshotHistoryProps {
  fileName: string;
}

const RunSnapshotHistory: React.FC<RunSnapshotHistoryProps> = ({ fileName }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/percy/snapshots/${fileName}/history`);
  };

  return (
    <button
      type='button'
      className='rounded-md bg-indigo-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      onClick={handleClick}
    >
      History
    </button>
  );
};

export default RunSnapshotHistory;
