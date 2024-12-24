import React from "react";
import style from "./BodyPage.module.css";
import homeImg from "../../assets/homeImg.png";
import cross from "../../assets/cross.png";
import right from "../../assets/right.png";
import bot from "../../assets/profile-bot.png";
import gif from "../../assets/giphy.gif";

const BodyPage = () => {
  return (
    <div className={style.bodyContainer}>
      <div className={style.main}>
        <h1>
          Build advanced chatbots <br /> visually
        </h1>
        <p>
          Typebot gives you powerful blocks to create unique chat experiences.
          Embed them <br />
          anywhere on your web/mobile apps and start collecting results like
          magic.
        </p>
        <button>Create a FormBot for free</button>
        <img src={homeImg} alt="homeImg" />
      </div>
      <div className={style.chatBotSection}>
        <h2>
          Replace your old school forms <br /> with <br />
          chatbots
        </h2>
        <p>
          Typebot is a better way to ask for information. It leads to an
          increase in customer satisfaction and retention and multiply by <br />{" "}
          3 <br />
          your conversion rate compared to classical forms.
        </p>
      </div>
      <div className={style.chatbotBox}>
        <div className={style.chatLeft}>
          <img src={cross} alt="cross" />
          <div className={style.formLeft}>
            <form>
              <div className={style.label}>
                <label>Full name</label> <p>*</p>
              </div>
              <input type="text" required placeholder="Full name" />
              <div className={style.label}>
                <label>Email</label> <p>*</p>
              </div>
              <input type="email" required placeholder="Email" />
              <div className={style.label}>
                <label>What services are you interested in?</label>
                <p>*</p>
              </div>

              <div className={style.checkbox}>
                <input type="checkbox" id="webdev" />
                <label htmlFor="webdev">Website Dev</label>
              </div>
              <div className={style.checkbox}>
                <input type="checkbox" />
                <label>Content Marketing</label>
              </div>
              <div className={style.checkbox}>
                <input type="checkbox" />
                <label>Social Media</label>
              </div>
              <div className={style.checkbox}>
                <input type="checkbox" />
                <label>UX/UI Design</label>
              </div>

              <label>Additional Information</label>
              <p>*</p>
              <textarea name="" id=""></textarea>

              <div className="submitBtn">
                <button type="submit"> submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className={style.chatRight}>
          <img src={right} alt="right" />
          <div className={style.formRight}>
            <div className={style.botTitle}>
              Welcome to &nbsp; <p>AA</p> (Awesome Agency)
            </div>
            <div className={style.giffy}>
              <div className={style.botImage}>
                <img src={bot} alt="bot" />
              </div>
              <div className={style.gif}>
                <img src={gif} alt="gif" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyPage;
