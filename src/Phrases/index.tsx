import { createSignal, Component, createEffect } from 'solid-js';

import { supabase } from '../api/api';
import { Button, Card, Loader, Section } from './styles';
import dices from '../assets/svg/dices.svg';

type Phrase = {
  id: number;
  content: string;
  created_at: string;
};

const Phrases: Component = () => {
  const [loading, setLoading] = createSignal(true);
  const [phrases, setPhrases] = createSignal<Phrase[]>([]);
  const [currentPhrase, setCurrentPhrase] = createSignal<string>();

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    getPhrases();
  };

  const getPhrases = async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase.from<Phrase>('phrases').select('*');

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setPhrases(data);

        setCurrentPhrase(phrases()[Math.floor(Math.random() * phrases().length)].content);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {
    getPhrases();
  });

  return (
    <Section>
      <Card>
        {loading() ? <Loader /> : <p>{currentPhrase()}</p>}

        <Button onClick={handleClick}>
          <img src={dices} alt='Dices' /> gerar novamente
        </Button>
      </Card>
    </Section>
  );
};

export default Phrases;
