let users: string[] = [];

export function addUser(name: string) {
  users.push(name);
}

export function getUsers() {
  return users;
}
