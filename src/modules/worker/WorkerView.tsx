import React from 'react';
import { Can } from '../../shared/components/Can';

export const WorkerView: React.FC = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <h2>You are a photag admin</h2>
      <Can 
        perform="boys-room:create"
        onYes={() => <button>Create Boys Room</button>}
      />
      <Can
        perform="girls-room:create"
        onYes={() => <button>Create Boys Room</button>}
      />
    </div>
  );
}