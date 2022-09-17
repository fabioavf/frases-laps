import { supabase } from './api/api';

const auditoria = () => {
  console.log(supabase.auth.session());

  return <div>auditoria</div>;
};

export default auditoria;
