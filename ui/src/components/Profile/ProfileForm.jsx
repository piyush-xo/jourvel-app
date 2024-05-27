import { useState, useRef } from "react";
import styles from "./ProfileForm.module.css";
import { baseUrl } from "../..//utils/BaseURL";

const ProfileForm = ({ userData }) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [profileImage, setProfileImage] = useState();
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  console.log("pfi:", profileImage);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageUpload = async (e) => {
    const [file] = e.target.files;
    if (file) {
      const base64 = await convertToBase64(file);
      setProfileImage(base64);
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (username || email || profileImage) {
      console.log(userData._id, username, email, profileImage);
      const res = await fetch(`${baseUrl}/api/users/${userData._id}`, {
        method: "post",
        headers: { "x-auth-token": localStorage.getItem("token") },
        body: JSON.stringify({ username: username, email: email, profileImage: profileImage }),
      });
    }
  };

  return (
    <div className={styles.container}>
      {!userData ? (
        <p>Loading...</p>
      ) : (
        <form className={styles.form} onSubmit={handleUpdate}>
          <input
            type="file"
            accept="image/*"
            multiple="false"
            ref={imageUploader}
            onChange={handleImageUpload}
            style={{
              display: "none",
            }}
          />
          <img
            ref={uploadedImage}
            className={styles.profileImage}
            onClick={() => imageUploader.current.click()}
            src={"user.png"}
          />
          <input
            className={styles.input}
            type="text"
            name="username"
            placeholder={userData.username}
            min="5"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder={userData.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className={styles.button}>
            Update
          </button>
        </form>
      )}
    </div>
  );
};
export default ProfileForm;
