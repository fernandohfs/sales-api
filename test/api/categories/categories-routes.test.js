import Lab from '@hapi/lab';
import { expect } from '@hapi/code';
import { BAD_REQUEST, CREATED, NO_CONTENT, NOT_FOUND, OK } from 'http-status';
import serverConfig from '../../../src/config/server.config';
import { getToken, serverInject } from '../../test.utils';

const { before, after, describe, it } = exports.lab = Lab.script();

describe('Routes /categories', () => {
    let server;
    let category;
    let authorization;
    const basePath = '/categories';

    before(async () => {
        server = await serverConfig.start();
        authorization = await getToken(server);
       
        const res = await serverInject({
            method: 'POST',
            url: basePath,
            headers: { authorization },
            payload: {
                description: 'Nova categoria'
            }
        }, server);

        category = res.payload;
    });

    after(async () => {
        await server.stop();
    });

    describe(`GET ${basePath}`, () => {
        it('returns 200 HTTP status code', async () => {
            const res = await serverInject({
                method: 'GET',
                url: basePath,
                headers: { authorization }
            }, server);

            expect(res.statusCode).to.equal(OK);
        })
    });

    describe(`POST ${basePath}`, () => {
        it('returns 201 HTTP status code', async () => {
            const res = await serverInject({
                method: 'POST',
                url: basePath,
                headers: { authorization },
                payload: {
                    description: 'Nova categoria'
                }
            }, server);

            expect(res.statusCode).to.equal(CREATED);
        });

        it('returns 400 HTTP status code when payload is invalid', async () => {
            const res = await serverInject({
                method: 'POST',
                url: basePath,
                headers: { authorization },
                payload: {
                    describe: 'a'
                }
            }, server);

            expect(res.statusCode).to.equal(BAD_REQUEST);
        });
    });

    describe(`GET ${basePath}/{id}`, () => {      
        it('returns 200 HTTP status code', async () => {
            const res = await serverInject({
                method: 'GET',
                url: `${basePath}/${category.id}`,
                headers: { authorization },
            }, server);

            expect(res.statusCode).to.equal(OK);
        });

        it('returns 400 HTTP status code when id is not a number', async () => {
            const res = await serverInject({
                method: 'GET',
                url: `${basePath}/algo`,
                headers: { authorization },
            }, server);

            expect(res.statusCode).to.equal(BAD_REQUEST);
        });

        it('returns 404 HTTP status code when post does not exist', async () => {
            const res = await serverInject({
                method: 'GET',
                url: `${basePath}/0`,
                headers: { authorization },
            }, server);

            expect(res.statusCode).to.equal(NOT_FOUND);
        });
    });

    describe(`PUT ${basePath}/{id}`, () => {
        it('returns 200 HTTP status code', async () => {
            const res = await serverInject({
              method: 'PUT',
              url: `${basePath}/${category.id}`,
              headers: { authorization },
              payload: {
                description: 'Atualizando categoria'
              }
            }, server);
      
            expect(res.statusCode).to.equal(OK);
        });

        it('returns 400 HTTP status code when payload is invalid', async () => {
            const res = await serverInject({
              method: 'PUT',
              url: `${basePath}/${category.id}`,
              headers: { authorization },
              payload: {
                description: 'A'
              }
            }, server);
      
            expect(res.statusCode).to.equal(BAD_REQUEST);
        });

        it('returns 404 HTTP status code when post does not exist', async () => {
            const res = await serverInject({
              method: 'PUT',
              url: `${basePath}/0`,
              headers: { authorization },
              payload: {
                description: 'Atualizando categoria'
              }
            }, server);
      
            expect(res.statusCode).to.equal(NOT_FOUND);
        });
    });

    describe(`DELETE ${basePath}/{id}`, () => {
        it('returns 204 HTTP status code', async () => {
            const res = await serverInject({
              method: 'DELETE',
              url: `${basePath}/${category.id}`,
              headers: { authorization }
            }, server);
      
            expect(res.statusCode).to.equal(NO_CONTENT);
          });

          it('returns 400 HTTP status code when id is not a number', async () => {
            const res = await serverInject({
              method: 'DELETE',
              url: `${basePath}/algo`,
              headers: { authorization }
            }, server);
      
            expect(res.statusCode).to.equal(BAD_REQUEST);
          });

          it('returns 404 HTTP status code when post does not exist', async () => {
            const res = await serverInject({
              method: 'DELETE',
              url: `${basePath}/${category.id}`,
              headers: { authorization }
            }, server);
      
            expect(res.statusCode).to.equal(NOT_FOUND);
          });
    });    
});