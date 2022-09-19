import { createSignal, Component, createEffect } from 'solid-js';

import { supabase } from './api/api';
import dices from '../assets/svg/dices.svg';
import { Phrase } from './interface/Phrase';
import Loading from './components/Loading';

const Phrases: Component = () => {
  const [loading, setLoading] = createSignal(true);
  const [phrases, setPhrases] = createSignal<Phrase[]>([]);
  const [currentPhrase, setCurrentPhrase] = createSignal<string>('Nada por aqui!');

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    getPhrases();
  };

  const getPhrases = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from<Phrase>('phrases')
        .select('content, checked')
        .eq('checked', true);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setPhrases(data);
        let newPhrase = '';

        do {
          newPhrase = phrases()[Math.floor(Math.random() * phrases().length)].content;
        } while (newPhrase == currentPhrase());

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
    <section class='flex flex-col items-center justify-center flex-grow px-4'>
      <article class='flex flex-col items-center justify-between gap-8 w-full max-w-md h-fit p-6 rounded bg-violet-200 shadow text-violet-600 font-medium text-2xl transition-all'>
        {loading() ? <Loading /> : <p>{currentPhrase()}</p>}

        <button
          onClick={handleClick}
          class='flex items-center gap-4 text-lg sm:text-2xl bg-violet-500 px-4 py-3 rounded font-bold text-violet-50 shadow hover:bg-violet-600 active:bg-violet-700 transition-all'
        >
          <i class='fa-solid fa-dice'></i> gerar novamente
        </button>
      </article>
    </section>
  );
};

export default Phrases;
