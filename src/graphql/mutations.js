/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: MessageInput!) {
    createMessage(input: $input) {
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
export const createRoom = /* GraphQL */ `
  mutation CreateRoom($input: RoomInput!) {
    createRoom(input: $input) {
      id
      createdAt
      name
      chatPartnerId
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
