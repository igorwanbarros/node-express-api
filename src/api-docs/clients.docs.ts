const list = {
  tags: ['clients'],
  description: 'List all clients',
  operationId: 'clients.list',
  security: [
    { bearerAuth: [] },
  ],
  parameters: [
    {
      name: 'id',
      in: 'query',
      required: false,
      schema: {
        type: 'string'
      }
    },
    {
      name: 'name',
      in: 'query',
      required: false,
      schema: {
        type: 'string'
      }
    },
    {
      name: 'email',
      in: 'query',
      required: false,
      schema: {
        type: 'string'
      }
    },
    {
      name: 'phone',
      in: 'query',
      required: false,
      schema: {
        type: 'string'
      }
    },
    {
      name: 'active',
      in: 'query',
      required: false,
      schema: {
        type: 'boolean'
      }
    }
  ],
  responses: {
    default: {
      description: "Response..."
    }
  }
};

const create = {
  tags: ['clients'],
  description: 'Create a new client',
  operationId: 'clients.create',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'New Client',
            },
            email: {
              type: 'string',
              example: 'client@email.com',
            },
            phone: {
              type: 'string',
              description: "phone of client",
              example: "999999999"
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    default: {
      description: "Response..."
    }
  }
};

const update = {
  tags: ['clients'],
  description: 'Update a client',
  operationId: 'clients.update',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string'
      }
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Updated Client',
            },
            email: {
              type: 'string',
              example: 'client@email.com',
            },
            phone: {
              type: 'string',
              description: "phone of client",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    default: {
      description: "Response..."
    }
  }
};

const remove = {
  tags: ['clients'],
  description: 'Delete a client',
  operationId: 'clients.delete',
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string'
      }
    },
  ],
  responses: {
    default: {
      description: "Response..."
    }
  }
};

export default {
  paths: {
    "/api/v1/clients": {
      get: list,
      post: create,
    },
    "/api/v1/clients/{id}": {
      put: update,
      delete: remove,
    },
  },
}
