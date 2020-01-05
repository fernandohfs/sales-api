
export const failAction = (request, h, err) => {
    let { output: { payload } } = err;
    delete payload.validation;

    return err;
};