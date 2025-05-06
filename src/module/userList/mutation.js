// to be refactored once the backend service is complete
export default {

  updateUser: async (parent, args, context) => {
    console.log('Inside updateUser of Apollo Server:', args);
    const {
      payload: { originalId, ...rest },
    } = args;
    const { dataSources: { userListAPI } } = context;
    const response = await userListAPI.update({
      originalId, rest,
    });
    return response.data;
  },

  deleteUser: async (parent, args, context) => {
    console.log('Inside deleteUser of Apollo Server:', args);
    const { id } = args;
    const { dataSources: { userListAPI } } = context;
    await userListAPI.remove(id);
    return { id };
  },

};
