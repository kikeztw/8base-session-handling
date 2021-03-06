import { createEvent } from '@cobuildlab/react-simple-state';
import { User } from '../../shared/types';

export const OnTokenFetched = createEvent<string>();

export const OnSessionFetch = createEvent<User | null>();

export const OnSessionFetchError = createEvent<Error>();