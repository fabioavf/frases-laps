import { createSignal, createEffect } from 'solid-js';
import { supabase } from './api/api';
import { Navigate, Router, useNavigate } from '@solidjs/router';
import Loading from './components/Loading';

const Login = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [loading, setLoading] = createSignal(false);
  const [hasError, setHasError] = createSignal(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('submit');

    try {
      console.log('try');

      let { user, error } = await supabase.auth.signIn({
        email: email(),
        password: password(),
      });

      if (error) throw error;

      if (user) {
        navigate('/auditoria', { replace: true });
      }
    } catch (error) {
      setHasError(true);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section class='flex flex-col items-center justify-center flex-grow px-4'>
      <form class='flex flex-col items-center gap-6 bg-violet-200 p-8 rounded shadow w-full md:w-96'>
        {loading() ? (
          <Loading />
        ) : (
          <>
            <div class='flex flex-col gap-2 w-full'>
              <label class='font-semibold' for='email'>
                E-mail
              </label>
              <input
                class='p-2 rounded bg-violet-50 shadow-sm'
                type='email'
                id='email'
                onBlur={(e) => setEmail(e.currentTarget.value)}
              />
            </div>
            <div class='flex flex-col gap-2 w-full'>
              <label class='font-semibold' for='password'>
                Senha
              </label>
              <input
                class='p-2 rounded bg-violet-50 shadow-sm'
                type='password'
                id='password'
                onBlur={(e) => setPassword(e.currentTarget.value)}
              />
            </div>

            {hasError() && <span class='text-red-500 self-start'>O email ou senha estão incorretos.</span>}

            <button
              class='bg-violet-500 p-2 rounded font-bold text-violet-50 w-full shadow hover:bg-violet-600 active:bg-violet-700 transition-all'
              type='submit'
              onClick={handleSubmit}
            >
              Entrar
            </button>
          </>
        )}
      </form>
    </section>
  );
};

export default Login;
