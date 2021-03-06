// @flow

import { pipe, join, keys, values, always, map } from 'rambdax'

import type Model from 'Model'
import type { SQLiteQuery } from '../index'

const columnNames = pipe(
  keys,
  join(', '),
)

const valuePlaceholders = pipe(
  values,
  map(always('?')),
  join(', '),
)

export default function encodeInsert(model: Model): SQLiteQuery {
  const { _raw: raw, table } = model
  const sql = `insert into ${table} (${columnNames(raw)}) values (${valuePlaceholders(raw)})`
  const args = values(raw)

  return [sql, args]
}
