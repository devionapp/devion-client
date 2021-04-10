import StoreServiceProvider from '../../app/providers/StoreServiceProvider';

const commitLastRoute = async route => {
  await StoreServiceProvider.store.dispatch('core/user/commitLastRoute', route);
};

export default async ({ name, params }) => {
  if (!name || name === 'core.login') {
    return await commitLastRoute(null);
  }

  await commitLastRoute({ name, params });
};
