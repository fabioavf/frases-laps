import { useNavigate } from '@solidjs/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createSignal, createEffect } from 'solid-js';
import { supabase } from './api/api';
import Loading from './components/Loading';
import { Phrase } from './interface/Phrase';

const Auditoria = () => {
  const [loading, setLoading] = createSignal(true);
  const [phrases, setPhrases] = createSignal<Phrase[]>([]);
  const [change, setChange] = createSignal<boolean>(false);
  const navigate = useNavigate();

  const session = supabase.auth.session();

  createEffect(async () => {
    if (session === null) {
      navigate('/login', { replace: true });
    } else {
      try {
        setLoading(true);

        if (session) {
          const { user } = supabase.auth.setAuth(session.access_token);

          let { data, error, status } = await supabase
            .from<Phrase>('phrases')
            .select('*')
            .eq('checked', false);

          if (error && status !== 406) {
            throw error;
          }

          if (data) {
            setPhrases(data);
          }
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }
  });

  const isLogged = () => {
    if (session === null) {
      return false;
    } else {
      return true;
    }
  };

  const handleRemove = async (id: number) => {
    try {
      let { data, error, status } = await supabase
        .from<Phrase>('phrases')
        .delete()
        .eq('id', id);
      setPhrases(phrases().filter((phrase) => phrase.id != id));
    } catch (error) {
      throw error;
    }
  };

  const handleApprove = async (id: number) => {
    try {
      let { data, error, status } = await supabase
        .from<Phrase>('phrases')
        .update({ checked: true })
        .eq('id', id);
      setPhrases(phrases().filter((phrase) => phrase.id != id));
    } catch (error) {
      throw error;
    }
  };

  return (
    <section class='flex flex-col items-center justify-center flex-grow p-4'>
      {isLogged() ? (
        <div class='bg-violet-100 p-8 mx-4 rounded shadow w-full max-w-3xl flex flex-col gap-6'>
          <h1 class='text-2xl'>Auditoria de frases</h1>

          {loading() ? (
            <Loading />
          ) : (
            <ul class='flex flex-col gap-4'>
              {phrases().map((phrase) => {
                return (
                  <li class='flex flex-col gap-4 bg-violet-200 p-4 rounded shadow'>
                    <h2 class='font-bold text-lg text-violet-700`'>
                      Conteúdo da frase
                    </h2>
                    <p class='text-base'>{phrase.content}</p>
                    {phrase.author && (
                      <>
                        <h2 class='font-bold text-lg text-violet-700`'>
                          Autor
                        </h2>
                        <p class='text-base'>{phrase.author}</p>
                      </>
                    )}
                    <span class='w-full bg-gray-900 h-px' />
                    <div class='flex gap-2 self-end'>
                      <button
                        onClick={() => handleRemove(phrase.id)}
                        class='px-4 py-2 bg-red-500 text-violet-100 rounded shadow font-bold hover:bg-red-600 active:bg-red-700 cursor-pointer transition-all'
                      >
                        Remover
                      </button>
                      <button
                        onClick={() => handleApprove(phrase.id)}
                        class='px-4 py-2 bg-green-500 text-violet-100 rounded shadow font-bold hover:bg-green-600 active:bg-green-700 cursor-pointer transition-all'
                      >
                        Aprovar
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <div class='bg-violet-100 p-8 mx-4 text-xl rounded shadow'>
          <p>Ops! Você não deveria estar nessa página!</p>
        </div>
      )}
    </section>
  );
};

export default Auditoria;
