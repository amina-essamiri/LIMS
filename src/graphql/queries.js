/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSalle = /* GraphQL */ `
  query GetSalle($id: ID!) {
    getSalle(id: $id) {
      id
      name
      eleves {
        nextToken
        __typename
      }
      etablissementID
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSalles = /* GraphQL */ `
  query ListSalles(
    $filter: ModelSalleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSalles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        etablissementID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const sallesByEtablissementID = /* GraphQL */ `
  query SallesByEtablissementID(
    $etablissementID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSalleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sallesByEtablissementID(
      etablissementID: $etablissementID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        etablissementID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEleve = /* GraphQL */ `
  query GetEleve($id: ID!) {
    getEleve(id: $id) {
      id
      name
      etablissementID
      Salles {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEleves = /* GraphQL */ `
  query ListEleves(
    $filter: ModelEleveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEleves(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        etablissementID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const elevesByEtablissementID = /* GraphQL */ `
  query ElevesByEtablissementID(
    $etablissementID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEleveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    elevesByEtablissementID(
      etablissementID: $etablissementID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        etablissementID
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEtablissement = /* GraphQL */ `
  query GetEtablissement($id: ID!) {
    getEtablissement(id: $id) {
      id
      name
      Eleves {
        nextToken
        __typename
      }
      Salles {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEtablissements = /* GraphQL */ `
  query ListEtablissements(
    $filter: ModelEtablissementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEtablissements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getEleveSalle = /* GraphQL */ `
  query GetEleveSalle($id: ID!) {
    getEleveSalle(id: $id) {
      id
      salleId
      eleveId
      salle {
        id
        name
        etablissementID
        createdAt
        updatedAt
        __typename
      }
      eleve {
        id
        name
        etablissementID
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEleveSalles = /* GraphQL */ `
  query ListEleveSalles(
    $filter: ModelEleveSalleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEleveSalles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        salleId
        eleveId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const eleveSallesBySalleId = /* GraphQL */ `
  query EleveSallesBySalleId(
    $salleId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEleveSalleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eleveSallesBySalleId(
      salleId: $salleId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        salleId
        eleveId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const eleveSallesByEleveId = /* GraphQL */ `
  query EleveSallesByEleveId(
    $eleveId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelEleveSalleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eleveSallesByEleveId(
      eleveId: $eleveId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        salleId
        eleveId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
