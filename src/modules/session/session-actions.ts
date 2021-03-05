import { client } from '../../shared/config/apollo-client';
import { createAction } from '@cobuildlab/react-simple-state';
import { FETCH_USER_SESSION } from './session-queries';
import { OnSessionFetch, OnSessionFetchError } from './session-events';

export const fetchSession = createAction(
  OnSessionFetch,
  OnSessionFetchError,
  async (): Promise<{ id: string, email: string } | null> => {
    
    const { data: { user } } = await client.query<{ user: { id: string, email: string } | null}>({
      query: FETCH_USER_SESSION,
      fetchPolicy: 'network-only',
    });

    return user;
  }
)