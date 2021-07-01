import { createBrowserHistory } from 'history';
import { useState, useEffect } from 'react';
import queryString, { ParsedQuery } from 'query-string';

import playroomConfig from '../config';
import { compileJsx } from './compileJsx';

const history = createBrowserHistory();

export function updateUrlCode(code: string) {
  const { pathname } = history.location;

  const existingQuery = getParamsFromQuery();

  const newQuery = queryString.stringify({
    ...existingQuery,
    code,
  });

  const params =
    playroomConfig.paramType === 'hash' ? `#?${newQuery}` : `?${newQuery}`;

  history.replace(`${pathname}${params}`);
}

export function getParamsFromQuery(location = history.location) {
  try {
    return queryString.parse(
      playroomConfig.paramType === 'hash'
        ? location.hash.replace(/^#/, '')
        : location.search
    );
  } catch (err) {
    return {};
  }
}

export function useParams<ReturnType>(selector: (rawParams: ParsedQuery) => ReturnType): ReturnType {
  const [params, setParams] = useState(getParamsFromQuery);

  useEffect(
    () => {
      let code;
      window.onstorage = () => {
        let codeInState = localStorage.getItem('code');
        code = codeInState ? codeInState : playroomConfig.exampleCode
        code = compileJsx(code as string)
        setParams({
          code: code,
          themeName: "__PLAYROOM__NO_THEME__"
        });
      };
      // history.listen((location) => {
      //   let weaverCode = compileJsx(localStorage.getItem('code'));
      //   console.log("location",getParamsFromQuery(location))
      //   setParams({
      //     code: weaverCode,
      //     themeName: "__PLAYROOM__NO_THEME__"
      //   });
      // }),
    []
    }
  );

  return selector(params);
}
