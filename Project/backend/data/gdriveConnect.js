import { google } from "googleapis";

export const gdriveConnect = async () => {
  const SCOPES = ["https://www.googleapis.com/auth/drive"];

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.SERVICE_EMAIL,
      private_key: process.env.SERVICE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });

  const driveService = google.drive({ version: "v3", auth });

  // Check if the drive is connected
  try {
    await driveService.files.list({
      pageSize: 1,
      fields: "files(id)",
    });
    console.log("Google Drive Connected Successfully.");
  } catch (error) {
    console.error("Error connecting to Google Drive:", error.message);
  }

  return driveService;
};
