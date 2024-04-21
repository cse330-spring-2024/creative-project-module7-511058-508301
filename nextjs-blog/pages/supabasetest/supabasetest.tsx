//import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseclient';

export default function Users() {
  const [users, setUsers] = useState(null);
  // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // const supabase = createClient(supabaseUrl, supabaseKey);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: users, error } = await supabase.from('users').select('username');
      console.log('Data:', users, 'Error:', error);
      if (error) {
        console.error(error);
      } else {
        setUsers(users);
      }
    };

    fetchUsers();
  }, []);

  console.log("Users " + users);
  
  return (
    <div>
      {users && users.map((user, index) => (
        <p key={index}>{user.username}</p>
      ))}
    </div>
  );
  
  // return <pre>{JSON.stringify(users, null, 2)}</pre>
}