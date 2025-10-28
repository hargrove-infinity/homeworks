import * as userStore from "../src/userStore";

const spyOnAddUserMockImpl = jest
  .spyOn(userStore, "addUser")
  .mockImplementation();

describe("userStore.mock", () => {
  it("addUser was called once with 'Ada'", () => {
    userStore.addUser("Ada");
    expect(spyOnAddUserMockImpl).toHaveBeenCalledTimes(1);
    expect(spyOnAddUserMockImpl).toHaveBeenCalledWith("Ada");
  });

  it("getUsers() returns []", () => {
    expect(userStore.getUsers()).toEqual([]);
  });
});
