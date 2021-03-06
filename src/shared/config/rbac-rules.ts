import { User } from "../types"

const rules: Rules = {
  Guest: {
    static: [
      ''
    ],
    dynamic: {

    },
  },
  PhotagAdmin: {
    static: [
      'admin-page:visit',
    ],
    dynamic: {
      'boys-room:create': ({ user }) => {
        return user.gender === 'male';
      },
      'girls-room:create': ({ user }) => {
        return user.gender === 'female';
      },
    }
  },
  PhotagWorker: {
    static: [
      'worker-page:visit',
    ],
    dynamic: {
      'boys-room:create': ({ user }) => {
        return user.gender === 'male';
      },
      'girls-room:create': ({ user }) => {
        return user.gender === 'female';
      },
    }
  },
};

export type Rules = {
  Guest: {
    static?: Array<string>,
    dynamic?: {
      [key: string]: (data: Record<string, any>) => boolean,
    }
  },
  [key: string]: {
    static?: Array<string>,
    dynamic?: {
      [key: string]: (data: { user: User, [key: string]: any }) => boolean,
    }
  }
}

export default rules;