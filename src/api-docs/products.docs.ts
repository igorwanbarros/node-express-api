const list = {
  tags: ['products'],
  description: 'List all products',
  operationId: 'products.list',
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
  tags: ['products'],
  description: 'Create a new product',
  operationId: 'products.create',
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
              example: 'New Product',
            },
            description: {
              type: 'string',
              example: 'product description',
            },
            price: {
              type: 'numeric',
              description: "price of product",
              example: 42.5,
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
  tags: ['products'],
  description: 'Update a product',
  operationId: 'products.update',
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
              example: 'New Product',
            },
            description: {
              type: 'string',
              example: 'product description',
            },
            price: {
              type: 'numeric',
              description: "price of product",
              example: 42.5,
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
  tags: ['products'],
  description: 'Delete a product',
  operationId: 'products.delete',
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
    "/api/v1/products": {
      get: list,
      post: create,
    },
    "/api/v1/products/{id}": {
      put: update,
      delete: remove,
    },
  },
  // schemas: {
  //   ['products.response']: responseDefault,
  //   ['products.not-found']: notFound,
  //   ['products.internal-error']: internalError,
  //   ['products.create.body']: bodyCreated,
  //   ['products.update.body']: bodyUpdated,
  // }
}
