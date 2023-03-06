export const selectContacts = state => state.contacts.items;

export const selectTextFilter = state => state.filter.value;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectToken = state => state.auth.token;
