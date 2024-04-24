import React from 'react';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../../../../page';
import SidebarLayout from '../../../../../components/layouts/SidebarLayout';
import fetchFiles from '../../../../../services/percy/snapshots/files';
import { GetServerSideProps } from 'next';
import List from '../../../../../components/list';
import HistoryCell from '../../../../../components/snapshots/historyCell';

type HistoryItem = {
  id: string;
  status: string;
  run_at: string;
};

type HistoryPageProps = {
  historyData: {
    history: HistoryItem[];
  };
};

const HistoryPage:NextPageWithLayout<HistoryPageProps> = ({historyData}) => {
  const router = useRouter();
  const { id } = router.query;
  const history = historyData.history || [];

  return (
    <div className="py-1 lg:py-0">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Snapshot History</h1>
              <p className="mt-2 text-sm text-gray-700">
                Showing history for: {id}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 flow-root overflow-hidden">
          <List title={''}
                heading={['Id', 'Status', 'Run At', 'Error']}
                items={history}
                DataCell={HistoryCell}
          />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HistoryPageProps> = async (context) => {
  const { id } = context.query;
  const directory = 'percyList/snapshots';
  const historyData = await fetchFiles({ directory: directory, fileName: id });
  return {
    props: {
      historyData,
    },
  };
};

HistoryPage.getLayout = (page) => {
  return (
    <SidebarLayout>
      {page}
    </SidebarLayout>
  );
};

export default HistoryPage;
