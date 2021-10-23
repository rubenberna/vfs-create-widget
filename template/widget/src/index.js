import React from "react";
import PropTypes from "prop-types";
import { IntlProvider } from 'react-intl'
import flatten from 'flat'
import { App } from "./components/App";
import { ExampleIcon } from "./assets/icons/ExampleIcon";
import lang_en from './lang/en.json'
import lang_nl from './lang/nl.json'

export const Component = ({ state }) => {
  const lang = state.locale === 'en' ? lang_en : lang_nl

  return (
    <IntlProvider locale={state.locale} messages={flatten(lang)}>
      <App platformState={state} />
    </IntlProvider>
  )
};

const metadata = {
  //ids per database environment to be given by the Data Portal admin
  ids: {
    dev: "",
    qa: "",
    prod: "",
  },
  title:  "{{name}}",
  description: "{{description}}",
  icon: ExampleIcon, // can also be a google fonts icon (https://fonts.google.com/icons) for example
};

export { Component as default, metadata };

App.propTypes = {
  state: PropTypes.shape({
    locale: PropTypes.string,
    changeLocale: PropTypes.func,
    idToken: PropTypes.string,
    addNotification: PropTypes.func,
    closeNotification: PropTypes.func,
    environment: PropTypes.string
  }),
};
