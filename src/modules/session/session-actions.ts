import { client } from '../../shared/config/apollo-client';
import { createAction } from '@cobuildlab/react-simple-state';
import { FETCH_USER_SESSION } from './session-queries';
import { OnSessionFetch, OnSessionFetchError } from './session-events';

export const fetchSession = createAction(
  OnSessionFetch,
  OnSessionFetchError,
  async (): Promise<{ id: string, email: string } | null> => {
    let response: any 
    try {
      response = await client.query<{ user: { id: string, email: string } | null}>({
        query: FETCH_USER_SESSION,
        fetchPolicy: 'network-only',
      });
    } catch (error) {
      console.error(JSON.stringify(error, null, 2))
    }
    const { data: { user } } = response;

    return user;
  }
)