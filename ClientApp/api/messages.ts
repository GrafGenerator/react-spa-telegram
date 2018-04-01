import { apiBaseUrl } from "#config/apis";
import { createFetch } from "#common/api";
import { IMessageApiModel, IMessagesRequest, IPostMessageRequest } from "#models/api";
import * as init from "#common/api/inits";

export function getLatestMessages(request: IMessagesRequest): Promise<IMessageApiModel[]> {
  const searchParams: (() => init.OptionSpec)[] = [
    init.searchUriSegment("pid", request.pid),
    init.searchUriSegment("offset", request.offset),
    init.searchUriSegment("count", request.count),
  ];

  return createFetch(apiBaseUrl)
    .get("", null, ...searchParams)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(`Get latest messages request failed with code ${resp.status}, "${resp.statusText}"`);
    })
    .then(data => (<IMessageApiModel[]>data));
}

export function postMessage(request: IPostMessageRequest): Promise<IMessageApiModel> {
  return createFetch(apiBaseUrl)
    .post("", request)
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
      throw new Error(`Post message request failed with code ${resp.status}, "${resp.statusText}"`);
    })
    .then(data => (<IMessageApiModel>data));
}
