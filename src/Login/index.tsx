import { Section, Card, Col, Input, Button } from './style';
import { createSignal, createEffect } from 'solid-js';
import { supabase } from '../api/api';
import { Navigate, Router } from '@solidjs/router';

const Login = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let { user, error } = await supabase.auth.signIn({
        email: email(),
        password: password(),
      });

      if (error) throw error;

      if (user) {
        return <Navigate href='/auditoria' />;
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <Card>
        <Col gap={2}>
          <Col gap={1}>
            <Input
              type='email'
              name='email'
              id='email'
              placeholder='Email'
              value={email()}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <Input
              type='password'
              name='password'
              id='password'
              placeholder='Senha'
              value={password()}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Col>
          <Button type='submit' onClick={handleSubmit}>
            Entrar
          </Button>
        </Col>
      </Card>
    </Section>
  );
};

export default Login;
