import { createSignal, Component, createEffect } from 'solid-js';

import { supabase } from './api/api';
import { Phrase } from './interface/Phrase';
import Loading from './components/Loading';
import dummyPhrase from './shared/json/dummyPhrase.json';
import toast from 'solid-toast';

const Phrases: Component = () => {
  const [loading, setLoading] = createSignal(true);
  const [phrases, setPhrases] = createSignal<Phrase[]>([]);
  const [currentPhrase, setCurrentPhrase] = createSignal<Phrase>(dummyPhrase);
  const [displayForm, setDisplayForm] = createSignal<boolean>(false);
  const [formPhrase, setFormPhrase] = createSignal({ content: '', author: '' });

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    getPhrases();
  };

  const getPhrases = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase.from<Phrase>('phrases').select('*').eq('checked', true);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setPhrases(data);

        let newPhrase: Phrase = dummyPhrase;

        do {
          newPhrase = phrases()[Math.floor(Math.random() * phrases().length)];
        } while (newPhrase.id === currentPhrase().id);

        setCurrentPhrase(newPhrase);
      }
    } catch (error: any) {
      throw error.message;
    } finally {
      setLoading(false);
    }
  };

  const handleDisplayForm = () => {
    setDisplayForm(!displayForm());
  };

  const handleSend = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('phrases')
        .insert([{ content: formPhrase().content, author: formPhrase().author }]);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
      setDisplayForm(false);
      toast.success('Muito obrigado pela contribuição! Sua mensagem será avaliada e, em breve, estará em nosso site!', {
        position: 'top-center',
      });
    }
  };

  createEffect(() => {
    getPhrases();
  });

  return (
    <section class='flex flex-col items-center justify-center flex-grow px-4 relative'>
      {displayForm() ? (
        <article class='flex flex-col items-center gap-8 w-full max-w-md h-fit p-6 rounded bg-violet-200 shadow text-gray-800 font-medium text-2xl transition-all'>
          {loading() ? (
            <Loading />
          ) : (
            <>
              <button
                onClick={() => setDisplayForm(!displayForm())}
                class='flex items-center gap-2 self-start text-violet-600 text-base hover:text-violet-700 active:text-violet-800 transition-all'
              >
                <i class='fa-solid fa-arrow-left-long' />
                <span>Voltar</span>
              </button>
              <form class='flex flex-col items-center gap-6 w-full'>
                <div class='flex flex-col gap-2 w-full'>
                  <label class='font-semibold text-base' for='content'>
                    Sua mensagem
                  </label>
                  <textarea
                    class='p-2 rounded bg-violet-50 shadow-sm text-base'
                    id='content'
                    onBlur={(e) => setFormPhrase({ ...formPhrase(), content: e.currentTarget.value })}
                  />
                </div>

                <div class='flex flex-col gap-2 w-full'>
                  <label class='font-semibold text-base' for='author'>
                    Autor (opcional)
                  </label>
                  <input
                    class='p-2 rounded bg-violet-50 shadow-sm text-base'
                    type='text'
                    id='author'
                    onBlur={(e) => setFormPhrase({ ...formPhrase(), author: e.currentTarget.value })}
                  />
                </div>

                <button
                  onClick={handleSend}
                  class='bg-violet-500 py-2 px-4 rounded font-bold w-full text-violet-50 shadow hover:bg-violet-600 active:bg-violet-700 transition-all flex items-center justify-center gap-4'
                >
                  <i class='fa-solid fa-paper-plane' />
                  <span>enviar</span>
                </button>
              </form>
            </>
          )}
        </article>
      ) : (
        <>
          <article class='flex flex-col items-center justify-between gap-8 w-full max-w-md h-fit p-6 rounded bg-violet-200 shadow text-violet-600 font-medium text-2xl transition-all'>
            {loading() ? (
              <Loading />
            ) : (
              <figure class='flex flex-col gap-4'>
                <blockquote class=''>{currentPhrase().content}</blockquote>
                {currentPhrase().author !== '' && (
                  <figcaption class='text-right text-lg italic'>- {currentPhrase().author}</figcaption>
                )}
              </figure>
            )}
            <button
              onClick={handleClick}
              class='flex items-center gap-4 text-lg sm:text-2xl bg-violet-500 px-4 py-3 rounded font-bold text-violet-50 shadow hover:bg-violet-600 active:bg-violet-700 transition-all'
            >
              <i class='fa-solid fa-dice'></i> gerar novamente
            </button>
          </article>
          <button
            onClick={handleDisplayForm}
            class='flex md:gap-2 items-center justify-center absolute right-4 bottom-4 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 transition-all w-12 md:w-fit md:px-4 h-12 text-xl font-bold rounded-xl shadow text-white'
          >
            <i class='fa-solid fa-plus' />
            <span class='hidden md:inline transition-all'>Alguma sugestão?</span>
          </button>
        </>
      )}
    </section>
  );
};

export default Phrases;
