import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PostDetailPage = () => {
  const router = useRouter();
  console.log( 'router', router.query );

  const {id} = router.query;
  console.log( 'id', id );

  useEffect(() => {
    if(id === '2') {
      router.push('/');
    }
  });

  return (
    <div>
      El valor del parámetro es: {id}

      <button onClick={()=>router.replace('/hola')}>Ir a Hola</button>
    </div>
  );
};

export default PostDetailPage;
