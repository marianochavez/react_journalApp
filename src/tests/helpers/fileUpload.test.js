import 'setimmediate';
import cloudinary from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.v2.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET, 
});

describe("fileUpload tests", () => {
  test("should upload file and return the url", async () => {
    const resp = await fetch(
      "https://res.cloudinary.com/chavedo/image/upload/v1645057321/react-journal/hola.jpg",
      {
        method: "GET",
      }
    );
    const blob = await resp.blob();

    const file = new File([blob], "test.png");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    // delete img by id
    const imageId = url.slice(url.lastIndexOf("/") + 1, url.lastIndexOf("."));
    const folderName = 'react-journal';

    cloudinary.v2.uploader.destroy(`${folderName}/${imageId}`, {}, () => {
        // done();
    });

  });

  test("should return error", async () => {
    const file = new File([], "test.png");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
