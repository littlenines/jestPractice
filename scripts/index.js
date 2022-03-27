import userList from "./modules/sheetDb";
import AddUser from "./modules/addUser";


async function loadingData() {
  const data = await userList;
  AddUser(data[0]);
}

loadingData();
