import _ from 'lodash'

export const castColumn = ({ table, alias, column, key, join }) => {
  const castTable = `"${alias || table}"`
  const castColumn = `"${column}"`
  return `${castTable}.${castColumn}`
}

export const getAlias = (column, aliases, options)  => {
  const alias = (aliases && aliases[column]) ? aliases[column] : column
  return normalizeAlias(alias, options)
}

const normalizeAlias = (alias, options) => {
  if(typeof alias === 'string') {
    return normalizeAlias({
      column: alias
    }, options)
  }
  if(!alias.table) {
    return normalizeAlias({
      ...alias,
      ...normalizeColumn(alias.column, options)
    }, options)
  }
  const join = normalizeJoin(alias, options)
  return {
    table: alias.table,
    type: alias.type || 'string',
    alias: join ? generateAlias() : null,
    column: alias.column,
    key: alias.key,
    join
  }
}

const generateAlias = () => {
  return 'w'+_.random(100000000, 999999999).toString(36).replace(/\d/g, '')
}

const normalizeColumn = (string, options) => {
  const parts = string.match(/^(.+)\.(.+)$/)
  const column = parts ? parts[2] : string
  const colparts = column.match(/^(.+)->{1,2}'?([A-Za-z0-9_]+)'?$/)
  return {
    table: parts ? parts[1] : options.tableName,
    column: colparts ? colparts[1] : column,
    key: colparts ? colparts[2] : null
  }
}

const normalizeJoin = (alias, options) => {
  const { leftJoin, innerJoin, join } = alias
  if(leftJoin) {
    return {
      type: 'left',
      conditions: leftJoin
    }
  } else if(innerJoin) {
    return {
      type: 'inner',
      conditions: innerJoin
    }
  } else if(join) {
    return {
      type: join.type || 'inner',
      conditions: join.conditions
    }
  }
  return null
}
