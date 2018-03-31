import * as Uri from "urijs";
import * as init from "./inits";
import { OptionSpec } from "./inits";

const defaultOptionSpecs = [
  init.contentTypeJson,
];

export function createFetch(baseUrl: string, ...baseOptionSpecs: OptionSpec[]) {
  const commonOptionSpecs = [
    ...defaultOptionSpecs,
    ...baseOptionSpecs,
  ];

  const internalFetch = (resource: string, data: any, ...optionSpecs: OptionSpec[]) => {
    const url = new Uri(resource).absoluteTo(baseUrl).href();
    const fullOptionSpecs = [
      ...commonOptionSpecs,
      init.bodyContent(data),
      ...optionSpecs
    ];

    const fullOptions = fullOptionSpecs.reduce((cur, next) => ({ ...cur, ...next() }), {});
    const fetchInit = {
      ...fullOptions.opts,
      ...(fullOptions.headers ? { headers: fullOptions.headers } : {}),
    };

    return fetch(url, fetchInit);
  };

  return {
    get(resource: string, data: any = null, ...options: OptionSpec[]) {
      return internalFetch(resource, data, init.methodGet, ...options);
    },

    post(resource: string, data: any, ...options: OptionSpec[]) {
      return internalFetch(resource, data, init.methodPost, ...options);
    },
  };
}

