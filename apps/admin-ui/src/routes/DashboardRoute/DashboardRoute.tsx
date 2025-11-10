import { useLoaderData } from 'react-router';

import { DashboardLoaderData } from './DashboardRoute.loader';

export function DashboardRoute() {
  const { data } = useLoaderData<DashboardLoaderData>();

  const siteList = data?.sites?.map((site) => (
    <li key={site.id}>{site.name}</li>
  ));

  return (
    <div>
      <h2>This is the Dashboard.</h2>

      <h3>Here are your sites:</h3>
      <ul>
        {siteList || <li>No sites found.</li>}
      </ul>
    </div>
  );
}

export default DashboardRoute;
