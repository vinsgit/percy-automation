import React from "react";

interface HistoryCellProps {
  data: {
    id: number;
    status: string;
    run_at: string;
    errors: string[];
  };
}

const HistoryCell: React.FC<HistoryCellProps> = ({ data }) => {
  return (
    <tr key={data.id}>
       <td className='whitespace-nowrap px-4 py-4 text-sm align-top'>
        {data.id}
      </td>
      <td className='whitespace-nowrap px-4 py-4 text-sm align-top'>
        {data.status}
      </td>
      <td className='whitespace-nowrap px-3 py-4 text-sm align-top'>
        {data.run_at}
      </td>
      <td className='whitespace-nowrap px-3 py-4 text-sm align-top text-red-500'>
        {data.errors.map((error: string, index: number) => (
          <p key={index}>Error: {error}</p>
        ))}
      </td>
    </tr>
  );
};

export default HistoryCell;
