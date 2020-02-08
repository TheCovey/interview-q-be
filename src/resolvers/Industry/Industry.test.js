const request = require('supertest');

const server = require('../../server');

describe('Industry', () => {
	it('returns the list of industries', async () => {
		const app = server.createHttpServer({});
		const response = await request(app)
			.post('/')
			.send({
				query: `
						query {
							industries {
								name
							}
						}
					`,
			});

		expect(response.body.data.industries.length).toBeTruthy();
	});

	it('returns the posts for industries', async () => {
		const app = server.createHttpServer({});
		const response = await request(app)
			.post('/')
			.send({
				query: `
                query {
                  industry(name: "Visual Arts") {
										description
                  }
                }
              `,
			});

		expect(response.body.data.industry[0].description).toBeTruthy();
	});
});
