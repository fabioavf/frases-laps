import { createSignal, Component, createEffect } from 'solid-js';

import { supabase } from './api/api';
import { Phrase } from './interface/Phrase';
import Loading from './components/Loading';
import dummyPhrase from './shared/json/dummyPhrase.json';

const Phrases: Component = () => {
  const [loading, setLoading] = createSignal(true);
  const [phrases, setPhrases] = createSignal<Phrase[]>([]);
  const [currentPhrase, setCurrentPhrase] = createSignal<Phrase>(dummyPhrase);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    getPhrases();
  };

  const getPhrases = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from<Phrase>('phrases')
        .select('*')
        .eq('checked', true);

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

  createEffect(() => {
    getPhrases();
  });

  return (
    <section class='flex flex-col items-center justify-center flex-grow px-4 relative'>
      <article class='flex flex-col items-center justify-between gap-8 w-full max-w-md h-fit p-6 rounded bg-violet-200 shadow text-violet-600 font-medium text-2xl transition-all'>
        {loading() ? (
          <Loading />
        ) : (
          <figure class='flex flex-col gap-4'>
            <blockquote class=''>{currentPhrase().content}</blockquote>
            {currentPhrase().author !== '' && (
              <figcaption class='text-right text-lg italic'>
                - {currentPhrase().author}
              </figcaption>
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

      <button class='flex md:gap-2 items-center justify-center absolute right-4 bottom-4 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 transition-all w-12 md:w-fit md:px-4 h-12 text-xl font-bold rounded-xl shadow text-white'>
        <i class='fa-solid fa-plus' />
        <span class='hidden md:inline transition-all'>Alguma sugestão?</span>
      </button>
    </section>
  );
};

export default Phrases;
