import React, { useContext } from 'react';

import { observer } from 'mobx-react-lite';

import Colors from '../components/colors.settings';

import { StoreContext } from '../stores/store.context.jsx';

const Settings = observer(() => {
  const { clockotron } = useContext(StoreContext);
  return <Colors />;
});

export default Settings;
