import { Component, lazy } from 'solid-js';
import { Routes, Route } from '@solidjs/router';

const Phrases = lazy(() => import('./Phrases'));
const Login = lazy(() => import('./Login'));

const App: Component = () => {
  return (
    <main class='flex flex-col h-screen w-screen bg-gradient-to-br from-violet-600 to-violet-300'>
      <Routes>
        <Route path='/' component={Phrases} />
        <Route path='/login' component={Login} />
      </Routes>

      <footer class='flex flex-row items-center justify-end md:justify-center py-4 px-8 gap-1 bg-violet-50 shadow-md backdrop-blur-sm text-violet-900 opacity-70 text-xs sm:text-base transition-all'>
        <span>site desenvolvido por </span>
        <a
          class='flex flex-row items-center gap-3 no-underline group'
          href='http://github.com/fabioavf/'
          target='_blank'
        >
          <span class='group-hover:text-violet-600'> Fabio Amorelli</span>
          <i class='fa-brands fa-github group-hover:text-violet-600'></i>
        </a>
      </footer>
    </main>
  );
};

export default App;
