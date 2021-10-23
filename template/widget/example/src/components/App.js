import React, { Suspense, lazy, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useNotification } from '../utils/_useNotification';
import { metadata } from '{{name}}'
import { Home } from './Home';
import { SideNav } from './SideNav';
import { convertToKebabCase } from '../utils/_general.util';
import '{{name}}/dist/index.css'

const Component = lazy(() => import('{{name}}'))

const App = () => {
  const [locale, setLocale] = useState('en')
  const { addNotification, closeNotification } = useNotification()

  const dummyState = {
    locale,
    changeLocale: setLocale,
    idToken: "-",
    addNotification,
    closeNotification,
    environment: 'qa'
  }

  const exampleComponentLink = `/${convertToKebabCase(metadata.title)}`

  return (
    <BrowserRouter>
      <SideNav icon={metadata.icon} link={exampleComponentLink}/>
      <Switch>
        <Suspense fallback={<div>Loading...</div>}>
          <main className="main">
            <Route exact path="/" render={() => <Home dataToolTemplateInfo={metadata}/>}/>
            {metadata &&
            <Route
              path={exampleComponentLink}
              exact
              render={() => <Component state={dummyState}/>}
            />
            }
          </main>
        </Suspense>
      </Switch>
    </BrowserRouter>
  )
}

export default App
