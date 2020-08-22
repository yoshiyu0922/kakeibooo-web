import gql from 'graphql-tag';

const fetchAll = gql`
  query master {
    categories {
      id
      name
      isIncome
      isDeleted
    }
    categoryDetails {
      id
      categoryId
      name
      isDeleted
    }
    howToPays {
      id
      name
    }
  }
`;

export default fetchAll;
