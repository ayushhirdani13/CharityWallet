import { google } from "googleapis";

export const gdriveConnect = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
  });
  const response = await driveService.files.list({
    pageSize: 1000,
    fields: "files(id)",
  });
  console.log("Google Drive connected successfully!");

  const images = [
    // "1MxHAsXOWKEEO1ATP-yjQxxXPoO9zHeyj",
    // "1kYGEu-wHMzSY-mO-HEfRLZsdinrZp6mS",
    // "1_dgwcnP1NxVnAYmqcetAO2LfG2wkc4fy",
    // "1FVzZq0iEht5C3573rnAnLyY7SBe_uE6x",
  ];

  // Extract file IDs from the response
  const allFileIds = response.data.files.map((file) => file.id);

  const filesToDelete = allFileIds.filter(
    (fileId) => !images.includes(fileId)
  );

  // Delete files
  for (const fileId of filesToDelete) {
    try {
      await drive.files.delete({
        fileId,
      });
      console.log(`File with ID ${fileId} deleted successfully.`);
    } catch (deleteError) {
      console.error(
        `Error deleting file with ID ${fileId}:`,
        deleteError.message
      );
    }
  }
  return drive;
};
