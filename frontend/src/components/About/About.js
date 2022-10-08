import "./about.css";

export default function About() {
  return (
    <div id="about-me-container">
      <div id="image-container">
        <img
          id="d-choe"
          src="https://i.pinimg.com/564x/03/7d/eb/037deb185b73074e6d792864730fdca9.jpg"
        ></img>
      </div>
      <div id="info-container">
        <div id="name-container">
          <h4>About Me</h4>
          <h1>Michael De los Reyes</h1>
          <h5>Full Stack Developer</h5>
          <p id="email">Email: dlreyesmico@gmail.com</p>
          <a href="https://github.com/Micodlr">Github</a>
        </div>
        <div id="my-links"></div>
      </div>
    </div>
  );
}
