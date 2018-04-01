import { byteLength } from "byte-length";
import * as Uri from "urijs";

export interface IInitParams {
  uri: uri.URI;
  opts: any;
  hdrs: any;
}

const apply:
  (options?: any, headers?: any, uriTransform?: (source: uri.URI) => uri.URI) => (opts: any, hdrs: any, uri: uri.URI) => IInitParams =
  (options = {}, headers = {}, uriTransform) => (opts, hdrs, uri) => ({
    uri: uriTransform ? uriTransform(uri) : uri,
    opts: { ...opts, ...options },
    hdrs: { ...hdrs, ...headers },
  });

const buildMethod: (verb: string) => () => OptionSpec =
  (verb) => () => ({
    func: apply({ method: verb }),
    scope: OptionScope.Other
  });

export enum OptionScope {
  Uri,
  Other
}

export type OptionSpec = {
  func: Function;
  scope: OptionScope;
};

export const empty: () => OptionSpec =
  () => ({
    func: apply(),
    scope: OptionScope.Other
  });

export const methodGet: () => OptionSpec = buildMethod("GET");
export const methodPost: () => OptionSpec = buildMethod("POST");
export const methodPut: () => OptionSpec = buildMethod("PUT");
export const methodDelete: () => OptionSpec = buildMethod("DELETE");

export const contentTypeJson: () => OptionSpec = () => ({
  func: apply({}, { "Content-Type": "application/json" }),
  scope: OptionScope.Other
});

export const bodyContent: (content: any, contentType?: string) => () => OptionSpec =
  (content, contentType?) => () => ({
    func: apply({ content }, {
            ...(contentType ? { "Content-Type": contentType } : {}),
            ...(content.length != null ? { "Content-Length": byteLength(content) } : {}),
          }),
    scope: OptionScope.Other
  });

export const searchUriSegment: (name: string, value: any) => () => OptionSpec =
  (name, value) => () => ({
    func: apply({}, {}, (uri: uri.URI) => (uri.addSearch(name, value))),
    scope: OptionScope.Uri
  });

export const noCors: () => OptionSpec =
  () => ({
    func: apply({ mode: "no-cors" }),
    scope: OptionScope.Other
  });

export const cors: () => OptionSpec =
  () => ({
    func: apply({ mode: "cors" }),
    scope: OptionScope.Other
  });
