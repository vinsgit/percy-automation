interface ListProps {
  title: string | null;
  heading: string[];
  items: any[];
  DataCell: React.ComponentType<any>;
  handleNotifications?: (notification: any) => void;
}


const List: React.FC<ListProps> = ({ title, heading, items, DataCell, handleNotifications }) => {
  return (
    <div className="px-4 sm:px-6 md:px-8">
      <div className="lg:hidden py-3 align-baseline lg:px-8 flex-col">
      </div>
      <h1 className="text-xl font-semibold text-gray-900 py-8">{title}</h1>
      <div className='-mx-4 -my-2 overflow-x-auto'>
        <div className='inline-block min-w-full py-1 my-1 align-middle'>
          <div className='overflow-hidden ring-opacity-5 md:rounded-lg'>
            { items && items.length ? (
              <table className='min-w-full divide-y table-fixed item-list'>
                 <thead className="bg-white">
                  <tr>
                    { heading.map((head, idx) => (
                      <th key={idx} scope="col" className={`py-3.5 text-left text-sm font-semibold text-gray-900 ${ idx == 0 ? 'pl-4 pr-3' : 'px-3' }`}>
                        {head}
                      </th>
                    ))}
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {items.map((item) => (
                    <DataCell key={item.id}
                              data={item}
                              handleNotifications={handleNotifications}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <div className='text-sm text-center italic p-5'>No data available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
