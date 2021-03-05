import { createEvent } from '@cobuildlab/react-simple-state';

export const OnTokenFetched = createEvent<string>();

export const OnSessionFetch = createEvent<{ id: string, email: string } | null>();

export const OnSessionFetchError = createEvent<Error>();