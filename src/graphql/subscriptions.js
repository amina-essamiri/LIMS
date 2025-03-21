/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSalle = /* GraphQL */ `
  subscription OnCreateSalle($filter: ModelSubscriptionSalleFilterInput) {
    onCreateSalle(filter: $filter) {
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
export const onUpdateSalle = /* GraphQL */ `
  subscription OnUpdateSalle($filter: ModelSubscriptionSalleFilterInput) {
    onUpdateSalle(filter: $filter) {
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
export const onDeleteSalle = /* GraphQL */ `
  subscription OnDeleteSalle($filter: ModelSubscriptionSalleFilterInput) {
    onDeleteSalle(filter: $filter) {
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
export const onCreateEleve = /* GraphQL */ `
  subscription OnCreateEleve($filter: ModelSubscriptionEleveFilterInput) {
    onCreateEleve(filter: $filter) {
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
export const onUpdateEleve = /* GraphQL */ `
  subscription OnUpdateEleve($filter: ModelSubscriptionEleveFilterInput) {
    onUpdateEleve(filter: $filter) {
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
export const onDeleteEleve = /* GraphQL */ `
  subscription OnDeleteEleve($filter: ModelSubscriptionEleveFilterInput) {
    onDeleteEleve(filter: $filter) {
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
export const onCreateEtablissement = /* GraphQL */ `
  subscription OnCreateEtablissement(
    $filter: ModelSubscriptionEtablissementFilterInput
  ) {
    onCreateEtablissement(filter: $filter) {
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
export const onUpdateEtablissement = /* GraphQL */ `
  subscription OnUpdateEtablissement(
    $filter: ModelSubscriptionEtablissementFilterInput
  ) {
    onUpdateEtablissement(filter: $filter) {
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
export const onDeleteEtablissement = /* GraphQL */ `
  subscription OnDeleteEtablissement(
    $filter: ModelSubscriptionEtablissementFilterInput
  ) {
    onDeleteEtablissement(filter: $filter) {
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
export const onCreateEleveSalle = /* GraphQL */ `
  subscription OnCreateEleveSalle(
    $filter: ModelSubscriptionEleveSalleFilterInput
  ) {
    onCreateEleveSalle(filter: $filter) {
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
export const onUpdateEleveSalle = /* GraphQL */ `
  subscription OnUpdateEleveSalle(
    $filter: ModelSubscriptionEleveSalleFilterInput
  ) {
    onUpdateEleveSalle(filter: $filter) {
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
export const onDeleteEleveSalle = /* GraphQL */ `
  subscription OnDeleteEleveSalle(
    $filter: ModelSubscriptionEleveSalleFilterInput
  ) {
    onDeleteEleveSalle(filter: $filter) {
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
