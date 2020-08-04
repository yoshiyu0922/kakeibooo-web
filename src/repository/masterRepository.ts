import GraphQLClient from '../core/graphQLClient';
import gql from 'graphql-tag';
import { MasterType } from '../types/Master';

class MasterRepository {
  private graphQLClient: GraphQLClient;

  constructor({ graphQLClient }: { graphQLClient: GraphQLClient }) {
    this.graphQLClient = graphQLClient;
  }

  public fetchAll() {
    return this.graphQLClient
      .query(
        gql`
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
        `
      )
      .then(res => {
        return res.data as MasterType;
      });
  }
}

export default MasterRepository;
