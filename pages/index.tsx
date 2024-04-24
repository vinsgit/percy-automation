
import { NextPageWithLayout } from './page';
import SidebarLayout from '../components/layouts/SidebarLayout';

const Home: NextPageWithLayout = () => {
  return (
    <div className="bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Test Automation</h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Currently We have percy.io integrated with our automation framework.
        </p>
      </div>
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return (
    <SidebarLayout>
      {page}
    </SidebarLayout>
  );
};