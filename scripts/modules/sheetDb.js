import { GoogleSpreadsheet } from "google-spreadsheet";

const config = {
  type: "service_account",

  project_id: "spreadsheets-334013",

  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,

  private_key:
    (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),

  client_email: "spreadsheets@spreadsheets-334013.iam.gserviceaccount.com",
  client_id: "114768927475185783260",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/spreadsheets%40spreadsheets-334013.iam.gserviceaccount.com",
};

async function accessSpreadSheet() {
  const doc = new GoogleSpreadsheet(
    "1xJrfnc6w6OxLS6rU_bsnBOyNIxO1SJQW4UInp3y-068"
  );

  await doc.useServiceAccountAuth(config);
  await doc.loadInfo();
  const loginSheet = doc.sheetsByIndex[0];
  const login = await loginSheet.getRows({ offset: 0 });
  const sheet = doc.sheetsByIndex[1];
  const rows = await sheet.getRows({ offset: 0 });
  let sheetArray = [];

  sheetArray.push(sheet);
  sheetArray.push(rows);
  sheetArray.push(login);
  return sheetArray;
}

const spreadSheet = accessSpreadSheet();
export default spreadSheet;
