import React from 'react';
import { NextPageWithLayout } from '../../page';
import SidebarLayout from '../../../components/layouts/SidebarLayout';
import List from '../../../components/list';
import SnapshotsCell from '../../../components/snapshots/cell';
import { GetServerSideProps } from 'next';
import fetchFiles from '../../../services/percy/snapshots/files';
import { useState, useEffect } from 'react'

type PageProps = {
  data: any[];
  pagination: any
}

type NotificationType = {
  error?: string | null;
};

const SnapshotsIndex: NextPageWithLayout<PageProps> = ({data}) => {
  const [errors, setErrors] = useState<Array<string | null | undefined>>([]);

  const handleNotifications = (notification:NotificationType) => {
    const errorMessages = [...errors];
    const error = notification.error;
    errorMessages.push(error);
    setErrors(errorMessages)
  }

  useEffect(() => {
  }, [errors]);

  return (
    <div className="py-1 lg:py-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Snapshots</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list websites that are being monitored by Percy.io
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-5">
          {errors.map((error, index) => (
            <div key={index} className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
             { error }
            </div>
          ))}
         
        </div>
        <div className="mt-8 flow-root overflow-hidden">
          <List title={''}
                heading={['Website', 'Last Job Status', 'Run at', 'Status']}
                items={data}
                DataCell={SnapshotsCell}
                handleNotifications={handleNotifications}
          />
        </div>
      </div>
    </div>
  );
};

export default SnapshotsIndex;

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
  try {
    const directory = 'percyList/snapshots'
    const data = await fetchFiles({directory: directory});
    const pagination = {};
    return {
      props: { data, pagination }
    };
  } catch (error) {
    console.error('Error fetching data', error);
    return {
      props: { data: [], pagination: {} }
    };
  }
};

SnapshotsIndex.getLayout = (page) => {
  return (
    <SidebarLayout>
      {page}
    </SidebarLayout>
  );
};
