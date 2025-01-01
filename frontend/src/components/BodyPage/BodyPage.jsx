import React from "react";
import style from "./BodyPage.module.css";
import homeImg from "../../assets/homeImg.png";
import cross from "../../assets/cross.png";
import right from "../../assets/right.png";
import bot from "../../assets/profile-bot.png";
import gif from "../../assets/giphy.gif";
import tri from "../../assets/tri3.png";
import UU from "../../assets/UU.png";
import orange from "../../assets/orangeBg.png";
import blue from "../../assets/blurBlur.png";

const BodyPage = () => {
  return (
    <div className={style.bodyContainer}>
      <div className={style.flexContainer}>
        <div className={style.leftImg}>
          <img src={tri} alt="" />
        </div>
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
        </div>
        <div className={style.rightImg}>
          <img src={UU} alt="" />
        </div>
      </div>
      <div className={style.bgContainer}>
        <div className={style.backImage}>
          <img src={orange} alt="" />
          <img src={blue} alt="" />
        </div>
        <div className={style.homeImage}>
          <img src={homeImg} alt="homeImg" />
        </div>
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
                <label>Full name</label> <span>*</span>
              </div>
              <input type="text" required placeholder="Full name" />
              <div className={style.label}>
                <label>Email</label> <span>*</span>
              </div>
              <input type="email" required placeholder="Email" />

              <div className={style.label}>
                <label>What services are you interested in?</label>
                <span>*</span>
              </div>
              <div className={style.checkbox}>
                <input
                  type="checkbox"
                  id="webdev"
                  className={style.check}
                  required
                />
                <label htmlFor="webdev">Website Dev</label>
              </div>
              <div className={style.checkbox}>
                <input type="checkbox" required className={style.check} />
                <label>Content Marketing</label>
              </div>
              <div className={style.checkbox}>
                <input type="checkbox" required className={style.check} />
                <label>Social Media</label>
              </div>
              <div className={style.checkbox}>
                <input type="checkbox" required className={style.check} />
                <label>UX/UI Design</label>
              </div>

              <div className={style.additionalInformation}>
                <label>Additional Information</label>
                <span>*</span>
              </div>
              <textarea name="textarea" id=""></textarea>

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
            <div className={style.hiBtn}>
              <button>Hi!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyPage;
