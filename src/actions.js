/*
 * action types
 */

export const SET_DB = 'SET_DB'
export const SET_QUERY_STATE = 'SET_QUERY_STATE'

/*
 * action creators
 */

export function setDb(database) {
  return { type: SET_DB, database }
}

export function setQueryState(state) {
  return { type: SET_QUERY_STATE, state }
}

