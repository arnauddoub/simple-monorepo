import { type SchemaRules } from '@adonisjs/lucid/types/schema_generator';

export default {
  tables: {
    users: {
      columns: {
        role: {
          tsType: 'UserRole',
          imports: [{ source: '@my-monorepo/contracts', namedImports: ['UserRole'] }],
          decorators: [{ name: '@column' }],
        },
      },
    },
  },
} satisfies SchemaRules;
