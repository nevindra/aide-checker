// pages/api/getServerDetails.js
import { google } from "googleapis";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!SPREADSHEET_ID || !SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
  throw new Error("Missing required environment variables");
}

const auth = new google.auth.JWT({
  email: SERVICE_ACCOUNT_EMAIL,
  key: PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const fetchServerDetails = async (serialNumbers: Array<object>) => {
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1", // Adjust this range as needed
  });

  const rows: Array<object> | any = response.data.values;
  if (rows.length) {
    const header = rows[0];
    const dataRows = rows.slice(1);
    const serialNumberIndex = header.indexOf("SerialNumber");

    const serverDetailsList = serialNumbers.map((serialNumber) => {
      const serverDetailsRow = dataRows.find(
        (row: Array<object>) => row[serialNumberIndex] === serialNumber,
      );
      if (serverDetailsRow) {
        const serverDetails: { [key: string]: any } = { found: true };
        header.forEach((col: string, index: number) => {
          serverDetails[col] = serverDetailsRow[index];
        });
        return serverDetails;
      } else {
        return { found: false, SerialNumber: serialNumber };
      }
    });

    return serverDetailsList;
  }

  return serialNumbers.map((serialNumber) => ({
    found: false,
    SerialNumber: serialNumber,
  }));
};

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { serialNumbers } = req.body;
    const serverDetails = await fetchServerDetails(serialNumbers);
    if (Array.isArray(serverDetails) && serverDetails.length > 0) {
      res.status(200).json(serverDetails);
    } else {
      res
        .status(404)
        .json({ message: "No details found for these serial numbers" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
