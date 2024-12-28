/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listRooms = /* GraphQL */ `
  query ListRooms($ownerId: String!) {
    listRooms(ownerId: $ownerId) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const listMessagesForRoom = /* GraphQL */ `
  query ListMessagesForRoom($roomId: ID!, $sortDirection: ModelSortDirection) {
    listMessagesForRoom(roomId: $roomId, sortDirection: $sortDirection) {
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
  }
`;
