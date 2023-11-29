import { lazy, Suspense } from 'react';
import './styles/App.css'

const AppLazy = lazy(() => import('./AppLazy'));

const App = () => {
  return (
    <Suspense fallback={'Loading'}>
      <AppLazy />
    </Suspense>
  )
};

export default App;