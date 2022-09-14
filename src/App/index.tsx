import { Component, lazy } from 'solid-js';

import githubLogo from '../assets/svg/github-brands.svg';
import { Routes, Route } from '@solidjs/router';
import { Footer, Main } from './styles';

const Phrases = lazy(() => import('../Phrases'));
const Login = lazy(() => import('../Login'));

const App: Component = () => {
  return (
    <Main>
      <Routes>
        <Route path='/' component={Phrases} />
        <Route path='/login' component={Login} />
      </Routes>

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
