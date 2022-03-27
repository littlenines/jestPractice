import { GoogleSpreadsheet } from "google-spreadsheet";

const config = {
  type: "service_account",

  project_id: "spreadsheets-334013",

  private_key_id: "34d8b68f1d086ae3316e04c963d0b0dcecb65a9b",

  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDlVa3CSet/AK2c\nTIZ0/cTZzvTqQnZac4csDc/XSsi96iZLXOv++Q+FQ4yRColtSXQ1IrIGh7+wSISK\n5x631HsboWaikaoJPxlXL1Jmc1TRxIgukgASyeGFfl1UhZn4JeyiyKFerx/9AbyT\nNojBNfv2ZaJeNfErGX2gHPNbbFLDkWQ4MQeBe6V3zEwZ0/O9ukLUrf+Ro8MJEtHz\nm9RBCZG1qLT/Wwh1H4GqVgi7b45bOd0ogcKQtJtDt2zEm2QioEyNMQv+Lej1r0QT\ntNmKQmEG0eFwZGbmOymFDyR6fdEBsbkubwooBj7fUjwTRkbydoLiN/aZVRhia2eR\nSgU454FFAgMBAAECggEABRpWMrHG3+1Rr53jSwSfhfItMG44qHQUIKaRBpsXIuSs\nI/amGKcNkZtKbCrGGoytHYaPXAZWvVMrwdR5MkFz2M5LVJg1pp2FEJPQu09bJoy/\nM/wTLNfZoQkKBhiv753WaVvZ/VubtFs+yS7INbZgDCBAT+TW4CzhxveF8bWUFN5j\nRzbYwXb3e8BJhA5Sh+FChUZfcuCgauIIdqzlNeOWu43MrJLzCcDKc4iYYp6a9Vmr\n+oqMWHBKnUH+3SijOQzHCH7rT2RNDFq+9pmquS7zBp9jvWzyRquy5DSilv2phupq\nQqzW1dIYgtV5FTMdoSgskGAANMoLFGgPgSD/ZnzJqQKBgQD+DWA/prDvfP/8sQi2\nUo/S+EVoOHn4JMHtNBuOsnDDFdLGuAUmNRHiBguZDoow2rZ+6+STa6WTIvLW+0d0\nzFE6Tw/gZuoeWg4AgQl5DjmjkRzDD+FnW7UfeLrgTeyMWkiaM2C0eHpoj41JOzha\nY0ALn1yuc3t7kIpozO3fQC2iuQKBgQDnF8o/Ic7NM8LqRkhDIejA9daq4OVzYIdB\nDWIvNj3C+AucJGD3w4dKLacZOMT2SOJI02jB9AL0BL95AzdXMAnNEh44TsktouhZ\n2evKuGTeXQNlPrqc8pZEWTd3uHuVkfWexHEJmXBODQ/hY9jv5BVKnkOteo3tq7ck\nNt0ssGi87QKBgQCYVGzhvZFaCBl16rDOobKbTUJQu4xmvaOKFzRu24/BadR4Ut7D\nig6u9/D8VTuHD51dfRQRUPp2vv3c6c5uuhP6Ym2ioBLBID5FDxoe++iTqu8UBvGg\nh9ySglGLLS4o+fmOfD//9j1vdKPCxT+E8v3z+hoYgCYKcSCMtlPrCRBUAQKBgAiT\nWW3+Uy5KPXF0KjpTh8+hT9YHgnxFmL9RP9OAr8oMamHg97g6CUs3ZnwJH0YEbmFF\ndx27cGCdzH0xIVya68Iwae6s/cozwWuUKqvbK+MUkIuxSDuKxQjERsqqjet+/x5l\nK8yvZPuAgJZcnjBIxoF+XgSSB7JKLQGrB4ohAcIBAoGABXLB8UTEd2CaWXuufADI\n2U99Spc8STT84KKAJHHlV/nSPdgzP1ABV84A0GvbbdsroNq23hceFMmLeeYcVLj7\n6Ydm2jmyarqfCjn8yFyqT7m3Lsz/xT68f8Y/Ot7/ZjE5vmJX3J8i6sh8cAuqYZIP\ngvtL0+lfgU+WHiD9VyurJF0=\n-----END PRIVATE KEY-----\n",

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
