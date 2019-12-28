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