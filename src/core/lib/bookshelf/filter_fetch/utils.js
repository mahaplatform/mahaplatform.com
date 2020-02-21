import _ from 'lodash'

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
    alias: join ? _.random(100000000, 999999999).toString(36) : null,
    column: alias.column,
    join
  }
}

const normalizeColumn = (column, options) => {
  const parts = column.match(/^(\w+)\.(\w+)$/)
  return {
    table: parts ? parts[1] : options.tableName,
    column: parts ? parts[2] : column
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
