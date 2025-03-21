/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSalle = /* GraphQL */ `
  mutation CreateSalle(
    $input: CreateSalleInput!
    $condition: ModelSalleConditionInput
  ) {
    createSalle(input: $input, condition: $condition) {
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
export const updateSalle = /* GraphQL */ `
  mutation UpdateSalle(
    $input: UpdateSalleInput!
    $condition: ModelSalleConditionInput
  ) {
    updateSalle(input: $input, condition: $condition) {
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
export const deleteSalle = /* GraphQL */ `
  mutation DeleteSalle(
    $input: DeleteSalleInput!
    $condition: ModelSalleConditionInput
  ) {
    deleteSalle(input: $input, condition: $condition) {
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
export const createEleve = /* GraphQL */ `
  mutation CreateEleve(
    $input: CreateEleveInput!
    $condition: ModelEleveConditionInput
  ) {
    createEleve(input: $input, condition: $condition) {
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
export const updateEleve = /* GraphQL */ `
  mutation UpdateEleve(
    $input: UpdateEleveInput!
    $condition: ModelEleveConditionInput
  ) {
    updateEleve(input: $input, condition: $condition) {
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
export const deleteEleve = /* GraphQL */ `
  mutation DeleteEleve(
    $input: DeleteEleveInput!
    $condition: ModelEleveConditionInput
  ) {
    deleteEleve(input: $input, condition: $condition) {
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
export const createEtablissement = /* GraphQL */ `
  mutation CreateEtablissement(
    $input: CreateEtablissementInput!
    $condition: ModelEtablissementConditionInput
  ) {
    createEtablissement(input: $input, condition: $condition) {
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
export const updateEtablissement = /* GraphQL */ `
  mutation UpdateEtablissement(
    $input: UpdateEtablissementInput!
    $condition: ModelEtablissementConditionInput
  ) {
    updateEtablissement(input: $input, condition: $condition) {
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
export const deleteEtablissement = /* GraphQL */ `
  mutation DeleteEtablissement(
    $input: DeleteEtablissementInput!
    $condition: ModelEtablissementConditionInput
  ) {
    deleteEtablissement(input: $input, condition: $condition) {
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
export const createEleveSalle = /* GraphQL */ `
  mutation CreateEleveSalle(
    $input: CreateEleveSalleInput!
    $condition: ModelEleveSalleConditionInput
  ) {
    createEleveSalle(input: $input, condition: $condition) {
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
export const updateEleveSalle = /* GraphQL */ `
  mutation UpdateEleveSalle(
    $input: UpdateEleveSalleInput!
    $condition: ModelEleveSalleConditionInput
  ) {
    updateEleveSalle(input: $input, condition: $condition) {
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
export const deleteEleveSalle = /* GraphQL */ `
  mutation DeleteEleveSalle(
    $input: DeleteEleveSalleInput!
    $condition: ModelEleveSalleConditionInput
  ) {
    deleteEleveSalle(input: $input, condition: $condition) {
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
