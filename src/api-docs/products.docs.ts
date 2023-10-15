const list = {
  tags: ['products'],
  description: 'List all products',
  operationId: 'products.list',
  security: [
    {
      bearerAuth: [],
    },
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
    }
  ],
  responses: {
    '200': {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/products.response'
                },
              }
            },
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            $ref: '#/components/schemas/products.internal-error'
          },
        },
      },
    },
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
          $ref: '#/components/schemas/products.create.body',
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'Product created successfully!',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/products.response',
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            $ref: '#/components/schemas/products.internal-error'
          },
        },
      },
    },
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
      name: 'productId',
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
          $ref: '#/components/schemas/products.update.body',
        },
      },
    },
    required: true,
  },
  responses: {
    '200': {
      description: 'Product updated successfully!',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/products.response',
          },
        },
      },
    },
    '404': {
      description: 'Resource not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            $ref: '#/components/schemas/products.not-found'
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            $ref: '#/components/schemas/products.internal-error'
          },
        },
      },
    },
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
      name: 'productId',
      in: 'path',
      required: true,
      schema: {
        type: 'string'
      }
    },
  ],
  responses: {
    '204': {
      description: 'noContent',
      content: null,
    },
    '404': {
      description: 'Resource not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            $ref: '#/components/schemas/products.not-found'
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            $ref: '#/components/schemas/products.internal-error'
          },
        },
      },
    },
  }
};


const responseDefault = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'UUID',
    },
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
    createdAt: {
      type: 'string',
      description: "created date",
      example: "2023-01-01T00:00:00Z",
    },
    updatedAt: {
      type: 'string',
      description: "updated date",
      example: "2023-01-01T00:00:00Z",
    },
  },
};

const bodyCreated = {
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
};

const bodyUpdated = {
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
};

const notFound = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'No Product found',
    },
  }
};

const internalError = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: 'Internal Server Error',
    },
  }
};

export default {
  paths: {
    "/api/v1/products": {
      get: list,
      post: create,
    },
    "/api/v1/products/{productId}": {
      put: update,
      delete: remove,
    },
  },
  schemas: {
    ['products.response']: responseDefault,
    ['products.not-found']: notFound,
    ['products.internal-error']: internalError,
    ['products.create.body']: bodyCreated,
    ['products.update.body']: bodyUpdated,
  }
}
