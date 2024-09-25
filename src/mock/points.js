const points = [
  {
    'id': '1121f8f6-c01f-4b67-aff2-0bcd6c54f1c8',
    'base_price': 1473,
    'date_from': '2024-08-25T17:48:09.936Z',
    'date_to': '2024-08-26T08:39:09.936Z',
    'destination': '75ae5832-8468-4c17-b2b6-1eec4dbeae36',
    'is_favorite': false,
    'offers': [
      'dca55199-afd4-4ae7-87c6-d47826ee1d73',
      'c5b65695-7818-47e0-bd47-c52edb15d383'
    ],
    'type': 'restaurant'
  },
  {
    'id': 'b55e83a4-d765-4144-8e7c-7f690a9b9ab2',
    'base_price': 230,
    'date_from': '2024-08-27T17:02:09.936Z',
    'date_to': '2024-08-29T08:41:09.936Z',
    'destination': '1bdc7e0a-17d6-411e-8ed9-ba413fd7860a',
    'is_favorite': true,
    'offers': [
      '06e49025-cb13-40f1-b908-d407e40e7a03',
      '1eca0013-44d6-4f60-913b-be3cc92a451f',
      '83f3d48c-cb3f-44e5-80b4-a674920ba8c6',
      'ecf2e614-0070-48d4-99ce-ab895b5910b4',
      '714695ba-92a5-423c-9bc7-c42827d83fe2'
    ],
    'type': 'check-in'
  },
  {
    'id': 'f9cfd716-432f-429e-af57-0a656aa0bc36',
    'base_price': 5984,
    'date_from': '2024-08-29T21:26:09.936Z',
    'date_to': '2024-08-30T19:54:09.936Z',
    'destination': '9aa8c921-d6b9-459b-8604-03c18f7dfc28',
    'is_favorite': true,
    'offers': [
      'e24d9ced-27d8-4af9-b424-319b350df937',
      '6a4657b0-e00d-4aef-85c8-eaf1889297f7',
      'c892c024-89b9-41f8-bfbc-9f16eeff7aab',
      'efac3f93-f9f4-4b11-becf-c81924e79e41',
      '70c534d5-5f42-4973-a5b2-0f8330c04ba8'
    ],
    'type': 'flight'
  },
  {
    'id': 'f65bb157-16a4-4af4-a6e6-5c84e0eda7af',
    'base_price': 2235,
    'date_from': '2024-08-31T12:57:09.936Z',
    'date_to': '2024-08-31T23:50:09.936Z',
    'destination': 'a7f070d6-1b56-4c9b-975f-61078a860de1',
    'is_favorite': true,
    'offers': [
      'ecf2e614-0070-48d4-99ce-ab895b5910b4',
      '714695ba-92a5-423c-9bc7-c42827d83fe2'
    ],
    'type': 'check-in'
  },
  {
    'id': '4c9b1cef-c303-4300-9e4d-d46c90f99099',
    'base_price': 1556,
    'date_from': '2024-09-02T14:05:09.936Z',
    'date_to': '2024-09-04T03:49:09.936Z',
    'destination': '55666483-8a52-42fb-adc3-c68bdcfecd0f',
    'is_favorite': true,
    'offers': [
      'c5b65695-7818-47e0-bd47-c52edb15d383'
    ],
    'type': 'restaurant'
  },
  {
    'id': '5644e3db-27d0-4d57-b7b0-e0d47643fd90',
    'base_price': 2799,
    'date_from': '2024-09-05T01:38:09.936Z',
    'date_to': '2024-09-07T02:00:09.936Z',
    'destination': 'e2225dee-32a6-4ede-865b-d42f35aa30a2',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '6016ecbe-acd6-4aea-aa64-608ca70eda00',
    'base_price': 3255,
    'date_from': '2024-09-08T23:40:09.936Z',
    'date_to': '2024-09-10T12:19:09.936Z',
    'destination': '55666483-8a52-42fb-adc3-c68bdcfecd0f',
    'is_favorite': true,
    'offers': [
      '0359f6f0-9ec1-4be7-8edf-e731b233c3f1'
    ],
    'type': 'train'
  },
  {
    'id': 'fde8f93c-b837-44d9-9abb-1e30f92023bc',
    'base_price': 6641,
    'date_from': '2024-09-10T20:59:09.936Z',
    'date_to': '2024-09-12T19:00:09.936Z',
    'destination': '0a26a247-2fc5-45fb-a874-ed85317e3053',
    'is_favorite': true,
    'offers': [
      '85602e4e-f4c8-4e9b-b049-303c30e2fd55',
      '2e962c34-b507-45ff-b435-853c760699c0',
      'ab581f38-7a20-4c3a-83cf-2b7a79c2c538'
    ],
    'type': 'bus'
  },
  {
    'id': '97b4033b-0a17-48a9-a4ea-ff47bb640a53',
    'base_price': 2896,
    'date_from': '2024-09-14T12:12:09.936Z',
    'date_to': '2024-09-16T03:05:09.936Z',
    'destination': 'e75d5a88-4377-406a-baf8-866561a7f580',
    'is_favorite': true,
    'offers': [],
    'type': 'taxi'
  },
  {
    'id': '2cd8aa03-73f5-48e5-94b6-4a8807451b01',
    'base_price': 6658,
    'date_from': '2024-09-17T13:37:09.936Z',
    'date_to': '2024-09-17T22:01:09.936Z',
    'destination': 'f81cb09d-8504-4e61-99ea-5e2169a418d3',
    'is_favorite': true,
    'offers': [
      '85602e4e-f4c8-4e9b-b049-303c30e2fd55',
      '2e962c34-b507-45ff-b435-853c760699c0',
      'ab581f38-7a20-4c3a-83cf-2b7a79c2c538'
    ],
    'type': 'bus'
  },
  {
    'id': 'ed6599d7-5433-4a34-b07d-a314b1c78072',
    'base_price': 1629,
    'date_from': '2024-09-18T21:17:09.936Z',
    'date_to': '2024-09-20T01:20:09.936Z',
    'destination': 'e2225dee-32a6-4ede-865b-d42f35aa30a2',
    'is_favorite': true,
    'offers': [
      '9afaec64-fda7-4e90-ab77-d03281cf1fe3',
      '713c26fb-1371-4fc7-9052-346633947f6d'
    ],
    'type': 'taxi'
  },
  {
    'id': '8ddcbd54-41c2-49b4-82b6-d9ccb8e291c7',
    'base_price': 1498,
    'date_from': '2024-09-21T18:11:09.936Z',
    'date_to': '2024-09-22T03:31:09.936Z',
    'destination': 'f81cb09d-8504-4e61-99ea-5e2169a418d3',
    'is_favorite': true,
    'offers': [
      'ecf2e614-0070-48d4-99ce-ab895b5910b4',
      '714695ba-92a5-423c-9bc7-c42827d83fe2'
    ],
    'type': 'check-in'
  },
  {
    'id': 'c7ffd583-bcef-46b4-a396-3b39434b945e',
    'base_price': 1102,
    'date_from': '2024-09-23T14:38:09.936Z',
    'date_to': '2024-09-23T21:30:09.936Z',
    'destination': '0a26a247-2fc5-45fb-a874-ed85317e3053',
    'is_favorite': true,
    'offers': [
      '41de9a8d-9e00-4ec1-b4ba-327841c21df7',
      '75db0a2b-75d3-4f38-ac08-7a77058182b8',
      '8223d0e3-7121-4287-aef2-f3600dd6961c',
      'f2664b0c-3574-446d-9a30-f7c1093f92b7',
      'b3560210-a2ee-4637-af88-f134eef531bf'
    ],
    'type': 'ship'
  },
  {
    'id': 'b5cfc870-2437-4313-af6f-e3140572186e',
    'base_price': 7682,
    'date_from': '2024-09-25T07:02:09.936Z',
    'date_to': '2024-09-25T14:08:09.936Z',
    'destination': '75ae5832-8468-4c17-b2b6-1eec4dbeae36',
    'is_favorite': true,
    'offers': [
      '06e49025-cb13-40f1-b908-d407e40e7a03',
      '1eca0013-44d6-4f60-913b-be3cc92a451f',
      '83f3d48c-cb3f-44e5-80b4-a674920ba8c6',
      'ecf2e614-0070-48d4-99ce-ab895b5910b4',
      '714695ba-92a5-423c-9bc7-c42827d83fe2'
    ],
    'type': 'check-in'
  },
  {
    'id': '47b57cdf-0772-4cb9-917f-fe765bf11559',
    'base_price': 1237,
    'date_from': '2024-09-27T04:04:09.936Z',
    'date_to': '2024-09-27T10:29:09.936Z',
    'destination': '75ae5832-8468-4c17-b2b6-1eec4dbeae36',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '6ffdcdb9-5211-485d-93a1-77669cf42ee7',
    'base_price': 3151,
    'date_from': '2024-09-28T08:33:09.936Z',
    'date_to': '2024-09-29T11:56:09.936Z',
    'destination': '9aa8c921-d6b9-459b-8604-03c18f7dfc28',
    'is_favorite': true,
    'offers': [
      '1eca0013-44d6-4f60-913b-be3cc92a451f',
      '83f3d48c-cb3f-44e5-80b4-a674920ba8c6',
      'ecf2e614-0070-48d4-99ce-ab895b5910b4',
      '714695ba-92a5-423c-9bc7-c42827d83fe2'
    ],
    'type': 'check-in'
  },
  {
    'id': '4e4ad084-a156-4c6f-a1de-643f4a522d6b',
    'base_price': 7368,
    'date_from': '2024-09-29T22:36:09.936Z',
    'date_to': '2024-10-01T22:02:09.936Z',
    'destination': 'e75d5a88-4377-406a-baf8-866561a7f580',
    'is_favorite': false,
    'offers': [
      'ddc71da3-2662-41b4-88a3-2e4e70810c94',
      'e5f2a8f0-b788-4538-9562-ba819bc5e110',
      '8af68438-bce3-4ff6-9781-9112a1f40915',
      '9afaec64-fda7-4e90-ab77-d03281cf1fe3',
      '713c26fb-1371-4fc7-9052-346633947f6d'
    ],
    'type': 'taxi'
  },
  {
    'id': '33bf674d-7de0-4696-b002-acd599bfe133',
    'base_price': 5979,
    'date_from': '2024-10-03T13:01:09.936Z',
    'date_to': '2024-10-05T13:38:09.936Z',
    'destination': 'a7f070d6-1b56-4c9b-975f-61078a860de1',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '9db58d61-7542-4864-a426-7fcb5d6ccc1a',
    'base_price': 9698,
    'date_from': '2024-10-07T00:12:09.936Z',
    'date_to': '2024-10-08T01:59:09.936Z',
    'destination': '9aa8c921-d6b9-459b-8604-03c18f7dfc28',
    'is_favorite': true,
    'offers': [
      '0359f6f0-9ec1-4be7-8edf-e731b233c3f1'
    ],
    'type': 'train'
  },
  {
    'id': 'bb600ad7-ba0f-46bd-af81-7542e15602a9',
    'base_price': 6783,
    'date_from': '2024-10-09T08:25:09.936Z',
    'date_to': '2024-10-09T21:56:09.936Z',
    'destination': 'e2225dee-32a6-4ede-865b-d42f35aa30a2',
    'is_favorite': true,
    'offers': [],
    'type': 'restaurant'
  },
  {
    'id': 'f257e4c8-4968-409d-9941-aed5882ad441',
    'base_price': 6074,
    'date_from': '2024-10-10T23:53:09.936Z',
    'date_to': '2024-10-12T04:35:09.936Z',
    'destination': '1bdc7e0a-17d6-411e-8ed9-ba413fd7860a',
    'is_favorite': true,
    'offers': [
      'dca55199-afd4-4ae7-87c6-d47826ee1d73',
      'c5b65695-7818-47e0-bd47-c52edb15d383'
    ],
    'type': 'restaurant'
  },
  {
    'id': '725687b3-8daf-4170-b9cf-74a400fc52ef',
    'base_price': 4521,
    'date_from': '2024-10-14T00:57:09.936Z',
    'date_to': '2024-10-15T05:36:09.936Z',
    'destination': '1bdc7e0a-17d6-411e-8ed9-ba413fd7860a',
    'is_favorite': false,
    'offers': [
      '9afaec64-fda7-4e90-ab77-d03281cf1fe3',
      '713c26fb-1371-4fc7-9052-346633947f6d'
    ],
    'type': 'taxi'
  },
  {
    'id': 'ed6eef32-70f5-4085-9dc1-1e42a50e2053',
    'base_price': 2455,
    'date_from': '2024-10-16T07:38:09.936Z',
    'date_to': '2024-10-17T14:19:09.936Z',
    'destination': 'e75d5a88-4377-406a-baf8-866561a7f580',
    'is_favorite': true,
    'offers': [
      '6a4657b0-e00d-4aef-85c8-eaf1889297f7',
      'c892c024-89b9-41f8-bfbc-9f16eeff7aab',
      'efac3f93-f9f4-4b11-becf-c81924e79e41',
      '70c534d5-5f42-4973-a5b2-0f8330c04ba8'
    ],
    'type': 'flight'
  },
  {
    'id': '124e65f1-ae50-4ff9-86e7-ef7b8d4cd7e2',
    'base_price': 102,
    'date_from': '2024-10-18T20:15:09.936Z',
    'date_to': '2024-10-20T18:08:09.936Z',
    'destination': '46b14717-91f4-47d5-b540-86d6a523ba69',
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '872ea25a-ed79-4c0f-b1e6-8b95bfdf43bc',
    'base_price': 3452,
    'date_from': '2024-10-21T06:19:09.936Z',
    'date_to': '2024-10-22T15:40:09.936Z',
    'destination': '46b14717-91f4-47d5-b540-86d6a523ba69',
    'is_favorite': false,
    'offers': [],
    'type': 'sightseeing'
  }
];

export {points};
