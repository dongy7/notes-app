import { Server, Model, Factory, RestSerializer } from 'miragejs'

import { nanoid } from '@reduxjs/toolkit'
import faker from 'faker'
import { sentence, article } from 'txtgen'

export function makeServer({ environment = 'development' } = {}) {
  let server = new Server({
    environment,

    models: {
      note: Model,
    },

    factories: {
      note: Factory.extend({
        id() {
          return nanoid()
        },

        title() {
          return sentence()
        },

        content() {
          return article(1)
        },

        date() {
          return faker.date.recent(7)
        },
      }),
    },

    seeds(server) {
      server.createList('note', 5)
    },

    routes() {
      this.namespace = 'api'
      this.timing = 750

      this.get('/notes', (schema) => {
        return schema.notes.all()
      })

      this.post('/notes', (schema, request) => {
        let attrs = JSON.parse(request.requestBody).note

        return schema.notes.create(attrs)
      })

      this.patch('/notes/:id', (schema, request) => {
        let attrs = JSON.parse(request.requestBody).note

        return schema.notes.find(request.params.id).update(attrs)
      })

      this.delete('/notes/:id', (schema, request) => {
        const id = request.params.id
        schema.notes.find(id).destroy()
        return {
          id,
        }
      })
    },

    serializers: {
      note: RestSerializer,
    },
  })

  return server
}
