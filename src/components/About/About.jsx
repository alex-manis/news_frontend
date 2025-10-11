import "./About.css";
import avatarPlaceholder from "../../assets/avatar-placeholder.svg";

function About({ isSavedNewsPage }) {
  if (isSavedNewsPage) {
    return null;
  }

  return (
    <section className="about">
      <div className="about__container">
        <div className="about__image-placeholder">
          <img
            src={avatarPlaceholder}
            alt="avatar"
            className="about__image-avatar"
          ></img>
          <p className="about__image-text">
            Placeholder image. <br /> Put an image of yourself here.
          </p>
        </div>

        <div className="about__text">
          <h2 className="about__title">About the author</h2>
          <p className="about__paragraph">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
          </p>
          <p className="about__paragraph">
            You can also talk about your experience with TripleTen, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
