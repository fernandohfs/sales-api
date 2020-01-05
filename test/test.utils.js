const handleServerInjectResponse = ({ payload, ...rest }) => {
    if (payload) {
        payload = JSON.parse(payload);
    }

    return { ...rest , payload };
}

export async function serverInject(options, server) {
    const res = await server.inject(options);

    return handleServerInjectResponse(res);
}

export async function getToken(server) {
    let token;
    const payload = {
        "name": "User",
        "cpf_cnpj": "57842266816",
        "email": "user@gmail.com",
        "password": "123456",
        "type": 2
    };
  
    const createUser = async () => {
      const UsersDao = require('../src/api/users/users.dao').default;

      try {
        await UsersDao.findOne({params: { cpf_cnpj: payload.cpf_cnpj }, query: {}});
      } catch(err) {
        await UsersDao.create(payload);
      }      
    };
  
    const createSession = async () => {
      const res = await serverInject({
        method: 'POST',
        url: '/users/login',
        payload: {
          email: payload.email,
          password: payload.password
        }
      }, server);
  
      token = res.payload.token;
      
      return res;
    };
  
    await createUser()
    await createSession()
  
  
    return token;
  };