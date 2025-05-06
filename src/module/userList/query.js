export default {
  getAllUsers: async (parent, args, context) => {
    console.log('Inside getAllUsers of Apollo Server:', args);
    const { dataSources: { userListAPI } } = context;
    const { limit, cursor } = args;
    if (limit || cursor) {
      const response = await userListAPI.read({ cursor, limit });
      return response;
    }
    const response = await userListAPI.read();
    return response;
  },
  getAllEmails: async (parent, args, context) => {
    console.log('Inside getAllEmails of Apollo Server:', args);
    const { dataSources: { userListAPI } } = context;
    const { limit } = args;
    const response = await userListAPI.readEmail({ limit });
    return response;
  },
  getUser: async (parent, args, context) => {
    console.log('Inside getUser of Apollo Server:', args);
    const { id } = args;
    const { dataSources: { userListAPI } } = context;
    const response = await userListAPI.readOne(id);
    return response;
  },
  getCount: async (parent, args, context) => {
    console.log('Inside getCoount of Apollo Server:', args);
    const { dataSources: { userListAPI } } = context;
    const response = await userListAPI.getCount();
    return response;
  },
};
