/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRoomByOwnerId = /* GraphQL */ `
  subscription OnCreateRoomByOwnerId($ownerId: String!) {
    onCreateRoomByOwnerId(ownerId: $ownerId) {
      id
      createdAt
      name
      chatPartnerId
      chatPartnerRoomId
      ownerId
      messages {
        items {
          id
          createdAt
          roomId
          senderId
          recipientId
          content
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onCreateMessageByRoomId = /* GraphQL */ `
  subscription OnCreateMessageByRoomId($roomId: ID) {
    onCreateMessageByRoomId(roomId: $roomId) {
      id
      createdAt
      roomId
      senderId
      recipientId
      content
      __typename
    }
  }
`;
