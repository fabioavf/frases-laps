import { createSignal, createResource, Component, createEffect } from 'solid-js';

import { supabase } from '../api/api';
import { Button, Card, Footer, Loader, Main, Section } from './styles';
import githubLogo from '../assets/svg/github-brands.svg';
import dices from '../assets/svg/dices.svg';

type Phrase = {
  id: number;
  content: string;
  created_at: string;
};

const App: Component = () => {
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
    <Main>
      <Section>
        <Card>
          {loading() ? <Loader /> : <p>{currentPhrase()}</p>}

          <Button onClick={handleClick}>
            <img src={dices} alt='Dices' /> gerar novamente
          </Button>
        </Card>
      </Section>
      <Footer>
        <span>site desenvolvido por </span>
        <a href='http://github.com/fabioavf/' target='_blank'>
          <span> Fabio Amorelli</span>
          <img src={githubLogo} alt='GitHub Logo' />
        </a>
      </Footer>
    </Main>
  );
};

export default App;
