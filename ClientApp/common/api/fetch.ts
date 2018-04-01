import * as Uri from "urijs";
import * as init from "./inits";
import { OptionSpec } from "./inits";

const defaultOptionSpecs: (() => OptionSpec)[] = [
  init.contentTypeJson,
  init.cors
];

export interface IFetch {
  get(resource: string, data?: any, ...options: (() => OptionSpec)[]): Promise<Response>;
  post(resource: string, data: any, ...options: (() => OptionSpec)[]): Promise<Response>;
}

export function createFetch(baseUrl: string, ...baseOptionSpecs: (() => OptionSpec)[]): IFetch {
  const commonOptionSpecs: (() => OptionSpec)[] = [
    ...defaultOptionSpecs,
    ...baseOptionSpecs,
  ];

  const internalFetch: (resource: string, data: any, ...optionSpecs: (() => OptionSpec)[]) => Promise<Response> =
   (resource, data, ...optionSpecs) => {
    const uri: uri.URI = new Uri(resource + "?").absoluteTo(baseUrl);
    const fullOptionSpecs: (() => OptionSpec)[] = [
      ...commonOptionSpecs,
      data? init.bodyContent(data) : init.empty,
      ...optionSpecs
    ];

    const fullOptions: init.IInitParams =
      fullOptionSpecs.reduce((cur: init.IInitParams, next) =>
      ({ ...next().func(cur.opts, cur.hdrs, cur.uri) }), { uri });
    const fetchInit: any = {
      ...fullOptions.opts,
      ...(fullOptions.hdrs ? { headers: fullOptions.hdrs } : {}),
    };

    const url: string = fullOptions.uri.href();

    return fetch(url, fetchInit);
  };

  return {
    get(resource: string, data?: any, ...options: (() => OptionSpec)[]): Promise<Response> {
      return internalFetch(resource, data, init.methodGet, ...options);
    },

    post(resource: string, data: any, ...options: (() => OptionSpec)[]): Promise<Response> {
      return internalFetch(resource, data, init.methodPost, ...options);
    },
  };
}

