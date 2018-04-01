import { apiBaseUrl } from "#config/apis";
import { createFetch } from "#common/api";
import { IMessageApiModel, IMessagesRequest } from "#models/api";
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
      // todo remove!!!

    //   return [
    //     {
    //         "id": 1,
    //         "created_at": "2018-03-31 12:00:55.157565",
    //         "channel_post": {
    //             "id": 1,
    //             "created_at": "2018-03-30 13:16:30.175858",
    //             "user_channel": {
    //                 "id": 1,
    //                 "created_at": "2018-03-30 13:16:25.694748",
    //                 "user": {
    //                     "id": 263948818,
    //                     "first_name": "Root",
    //                     "last_name": "Kid",
    //                     "user_name": "r00tkid",
    //                     "is_bot": null,
    //                     "language_code": "C",
    //                     "created_at": "2018-03-27 20:47:23.583597"
    //                 },
    //                 "channel_id": "-1001120810239",
    //                 "username": "@test_magic",
    //                 "active": true
    //             },
    //             "post_text": "Меню",
    //             "post_picture": "",
    //             "is_published": false
    //         },
    //         "comment_text": "Where are my API requests?!",
    //         "user": {
    //             "id": 263948818,
    //             "first_name": "Root",
    //             "last_name": "Kid",
    //             "user_name": "r00tkid",
    //             "is_bot": null,
    //             "language_code": "C",
    //             "created_at": "2018-03-27 20:47:23.583597"
    //         }
    //     },
    //     {
    //         "id": 2,
    //         "created_at": "2018-04-01 11:20:16.368056",
    //         "channel_post": {
    //             "id": 1,
    //             "created_at": "2018-03-30 13:16:30.175858",
    //             "user_channel": {
    //                 "id": 1,
    //                 "created_at": "2018-03-30 13:16:25.694748",
    //                 "user": {
    //                     "id": 263948818,
    //                     "first_name": "Root",
    //                     "last_name": "Kid",
    //                     "user_name": "r00tkid",
    //                     "is_bot": null,
    //                     "language_code": "C",
    //                     "created_at": "2018-03-27 20:47:23.583597"
    //                 },
    //                 "channel_id": "-1001120810239",
    //                 "username": "@test_magic",
    //                 "active": true
    //             },
    //             "post_text": "Меню",
    //             "post_picture": "",
    //             "is_published": false
    //         },
    //         "comment_text": "test",
    //         "user": {
    //             "id": 370959358,
    //             "first_name": "Nikita",
    //             "last_name": "Ivanov",
    //             "user_name": "grafgenerator",
    //             "is_bot": null,
    //             "language_code": "ru-RU",
    //             "created_at": "2018-04-01 11:19:37.314826"
    //         }
    //     },
    //     {
    //         "id": 3,
    //         "created_at": "2018-04-01 11:31:38.276261",
    //         "channel_post": {
    //             "id": 1,
    //             "created_at": "2018-03-30 13:16:30.175858",
    //             "user_channel": {
    //                 "id": 1,
    //                 "created_at": "2018-03-30 13:16:25.694748",
    //                 "user": {
    //                     "id": 263948818,
    //                     "first_name": "Root",
    //                     "last_name": "Kid",
    //                     "user_name": "r00tkid",
    //                     "is_bot": null,
    //                     "language_code": "C",
    //                     "created_at": "2018-03-27 20:47:23.583597"
    //                 },
    //                 "channel_id": "-1001120810239",
    //                 "username": "@test_magic",
    //                 "active": true
    //             },
    //             "post_text": "Меню",
    //             "post_picture": "",
    //             "is_published": false
    //         },
    //         "comment_text": "test 2",
    //         "user": {
    //             "id": 370959358,
    //             "first_name": "Nikita",
    //             "last_name": "Ivanov",
    //             "user_name": "grafgenerator",
    //             "is_bot": null,
    //             "language_code": "ru-RU",
    //             "created_at": "2018-04-01 11:19:37.314826"
    //         }
    //     },
    //     {
    //         "id": 4,
    //         "created_at": "2018-04-01 11:33:09.449749",
    //         "channel_post": {
    //             "id": 1,
    //             "created_at": "2018-03-30 13:16:30.175858",
    //             "user_channel": {
    //                 "id": 1,
    //                 "created_at": "2018-03-30 13:16:25.694748",
    //                 "user": {
    //                     "id": 263948818,
    //                     "first_name": "Root",
    //                     "last_name": "Kid",
    //                     "user_name": "r00tkid",
    //                     "is_bot": null,
    //                     "language_code": "C",
    //                     "created_at": "2018-03-27 20:47:23.583597"
    //                 },
    //                 "channel_id": "-1001120810239",
    //                 "username": "@test_magic",
    //                 "active": true
    //             },
    //             "post_text": "Меню",
    //             "post_picture": "",
    //             "is_published": false
    //         },
    //         "comment_text": "test 3",
    //         "user": {
    //             "id": 370959358,
    //             "first_name": "Nikita",
    //             "last_name": "Ivanov",
    //             "user_name": "grafgenerator",
    //             "is_bot": null,
    //             "language_code": "ru-RU",
    //             "created_at": "2018-04-01 11:19:37.314826"
    //         }
    //     },
    //     {
    //         "id": 5,
    //         "created_at": "2018-04-01 11:45:53.006873",
    //         "channel_post": {
    //             "id": 1,
    //             "created_at": "2018-03-30 13:16:30.175858",
    //             "user_channel": {
    //                 "id": 1,
    //                 "created_at": "2018-03-30 13:16:25.694748",
    //                 "user": {
    //                     "id": 263948818,
    //                     "first_name": "Root",
    //                     "last_name": "Kid",
    //                     "user_name": "r00tkid",
    //                     "is_bot": null,
    //                     "language_code": "C",
    //                     "created_at": "2018-03-27 20:47:23.583597"
    //                 },
    //                 "channel_id": "-1001120810239",
    //                 "username": "@test_magic",
    //                 "active": true
    //             },
    //             "post_text": "Меню",
    //             "post_picture": "",
    //             "is_published": false
    //         },
    //         "comment_text": "test 4",
    //         "user": {
    //             "id": 370959358,
    //             "first_name": "Nikita",
    //             "last_name": "Ivanov",
    //             "user_name": "grafgenerator",
    //             "is_bot": null,
    //             "language_code": "ru-RU",
    //             "created_at": "2018-04-01 11:19:37.314826"
    //         }
    //     }
    // ];

      if (resp.ok) {
        return resp.json();
      }
      throw new Error(`Get latest messages request failed with code ${resp.status}, "${resp.statusText}"`);
    })
    .then(data => (<IMessageApiModel[]>data));
}
