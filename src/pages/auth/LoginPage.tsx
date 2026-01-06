import { useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 API 호출 로직 추가
    console.log({ email, password });
    // 예시 에러 처리
    if (!email) setErrorMsg("등록되지 않은 이메일입니다.");
    else if (!password) setErrorMsg("비밀번호가 올바르지 않습니다.");
    else setErrorMsg("");
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authWrap}>
        <div className={styles.authHeader}>
          <h1 className={styles.hTit}>
            <img src="/assets/img/common/logo.svg" alt="Logo" />
          </h1>
        </div>

        <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
          <div className={styles.authContent}>
            <div className={styles.authTitle}>
              <h2>jh0-0y 블로그에 오신 것을 환영합니다!</h2>
            </div>

            <div className={styles.authGroup}>
              {/* 이메일 입력 */}
              <div className={styles.inpGroup}>
                <input
                  type="email"
                  id="useremail"
                  name="email"
                  className={styles.inpFd}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  required
                  autoComplete="email"
                />
                <label
                  htmlFor="useremail"
                  className={`${styles.inpLb} ${
                    email || emailFocused ? styles.filled : ""
                  }`}
                >
                  이메일
                </label>
              </div>

              {/* 비밀번호 입력 */}
              <div className={styles.inpGroup}>
                <input
                  type="password"
                  id="passwd"
                  name="password"
                  className={styles.inpFd}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  required
                  autoComplete="current-password"
                />
                <label
                  htmlFor="passwd"
                  className={`${styles.inpLb} ${
                    password || passwordFocused ? styles.filled : ""
                  }`}
                >
                  비밀번호
                </label>
              </div>

              <div className={styles.helpTextWrap}>
                <p id="login-error" className={styles.errorMessage}>
                  {errorMsg}
                </p>
                <p className={styles.helpText}>
                  <a href="/auth/remember">아이디 및 비밀번호를 잊으셨나요?</a>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.authBtnWrap}>
            <button type="submit" className={styles.authBtn}>
              <span className={styles.authBtnText}>로그인</span>
            </button>

            <p className={styles.signupText}>
              계정이 없으신가요? 
              <Link to="/signup" >회원가입</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;