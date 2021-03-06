import { check } from '../utils/check';
import rules from '../config/rbac-rules';
import { OnSessionFetch } from '../../modules/session/session-events';
import { useEvent } from '@cobuildlab/react-simple-state';

export const Can: React.FC<Props> = ({ 
  perform, 
  data = {}, 
  onYes, 
  onNo = () => null
}: Props) => {
  const user = useEvent(OnSessionFetch);
  let role = '';

  if (!user) {
    role = 'Guest';

  } else {
    if (user.userPhoTagUserRelation.role === 'ADMINISTRATOR') {
      role = 'PhotagAdmin';
    } else {
      role = 'PhotagWorker';
    }
  }

  return check(rules, role, perform, { user, ...data }) ? (
    onYes()
  ) : (
    onNo()
  )
}

type Props = {
  perform: string,
  data?: any
  onYes: () => React.ReactNode,
  onNo?: () => any,
}
