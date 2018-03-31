import { byteLength } from "byte-length";

const apply = (options = {}, headers = {}) => (opts: any, hdrs: any) => ({
  opts: { ...opts, ...options },
  hdrs: { ...hdrs, ...headers },
});

const buildMethod = (verb: string) => apply({ method: verb });

export type OptionSpec = Function;

export const methodGet = buildMethod("GET");
export const methodPost = buildMethod("POST");
export const methodPut = buildMethod("PUT");
export const methodDelete = buildMethod("DELETE");

export const contentTypeJson = () => apply({}, { "Content-Type": "application/json" });

export const bodyContent = (content: any, contentType?: string) => apply({ content }, {
  ...(contentType ? { "Content-Type": contentType } : {}),
  ...(content.length != null ? { "Content-Length": byteLength(content) } : {}),
});

