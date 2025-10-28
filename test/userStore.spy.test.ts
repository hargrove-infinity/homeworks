import * as userStore from "../src/userStore";

const spyOnAddUser = jest.spyOn(userStore, "addUser");

describe("userStore.spy", () => {
  it("addUser was called once with 'Ada'", () => {
    userStore.addUser("Ada");

    expect(spyOnAddUser).toHaveBeenCalledTimes(1);
    expect(spyOnAddUser).toHaveBeenCalledWith("Ada");
  });

  it("getUsers() contains ['Ada']", () => {
    expect(userStore.getUsers()).toEqual(["Ada"]);
  });
});
