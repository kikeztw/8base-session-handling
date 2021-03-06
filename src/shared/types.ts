export type User = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  gender: string,
  userPhoTagUserRelation: PhotagUser
}

export type PhotagUser = {
  id: string,
  role: 'ADMINISTRATOR' | 'WORKER',
  active: boolean,
}