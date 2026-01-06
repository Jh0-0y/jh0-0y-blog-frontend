import { useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    alias: "",
    email: "",
    passwd: "",
    passwdConfirm: "",
  });

  const [focus, setFocus] = useState({
    name: false,
    alias: false,
    email: false,
    passwd: false,
    passwdConfirm: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFocus = (field: keyof typeof focus) => {
    setFocus((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof typeof focus) => {
    setFocus((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.passwd !== form.passwdConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // TODO: 실제 API 호출
    console.log("회원가입 폼 제출", form);
    setError("");
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authWrap}>
        <div className={styles.authHeader}>
          <h1 className={styles.hTit}>
            <a href="/">
              <img src="/assets/img/common/logo.svg" alt="logo" />
            </a>
          </h1>
        </div>

        <form className={styles.authForm} onSubmit={handleSubmit} noValidate>
          <div className={styles.authContent}>
            <div className={styles.authTitle}>
              <h2>GOT IT에 가입해 보세요!</h2>
            </div>

            <div className={styles.authGroup}>
              {/* 이름 */}
              <div className={styles.inpGroup}>
                <input
                  type="text"
                  id="username"
                  name="name"
                  className={styles.inpFd}
                  placeholder=""
                  required
                  minLength={2}
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus("name")}
                  onBlur={() => handleBlur("name")}
                />
                <label
                  htmlFor="username"
                  className={`${styles.inpLb} ${
                    form.name || focus.name ? styles.filled : ""
                  }`}
                >
                  이름
                </label>
              </div>

              {/* 닉네임 */}
              <div className={styles.inpGroup}>
                <input
                  type="text"
                  id="alias"
                  name="alias"
                  className={styles.inpFd}
                  placeholder=""
                  required
                  minLength={2}
                  maxLength={8}
                  value={form.alias}
                  onChange={handleChange}
                  onFocus={() => handleFocus("alias")}
                  onBlur={() => handleBlur("alias")}
                />
                <label
                  htmlFor="alias"
                  className={`${styles.inpLb} ${
                    form.alias || focus.alias ? styles.filled : ""
                  }`}
                >
                  닉네임
                </label>
              </div>

              {/* 이메일 */}
              <div className={styles.inpGroup}>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.inpFd}
                  placeholder=""
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleBlur("email")}
                />
                <label
                  htmlFor="email"
                  className={`${styles.inpLb} ${
                    form.email || focus.email ? styles.filled : ""
                  }`}
                >
                  이메일
                </label>
              </div>

              {/* 비밀번호 */}
              <div className={styles.inpGroup}>
                <input
                  type="password"
                  id="passwd"
                  name="passwd"
                  className={styles.inpFd}
                  placeholder=""
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={form.passwd}
                  onChange={handleChange}
                  onFocus={() => handleFocus("passwd")}
                  onBlur={() => handleBlur("passwd")}
                />
                <label
                  htmlFor="passwd"
                  className={`${styles.inpLb} ${
                    form.passwd || focus.passwd ? styles.filled : ""
                  }`}
                >
                  비밀번호 (8자 이상)
                </label>
              </div>

              {/* 비밀번호 확인 */}
              <div className={styles.inpGroup}>
                <input
                  type="password"
                  id="passwdConfirm"
                  name="passwdConfirm"
                  className={styles.inpFd}
                  placeholder=""
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={form.passwdConfirm}
                  onChange={handleChange}
                  onFocus={() => handleFocus("passwdConfirm")}
                  onBlur={() => handleBlur("passwdConfirm")}
                />
                <label
                  htmlFor="passwdConfirm"
                  className={`${styles.inpLb} ${
                    form.passwdConfirm || focus.passwdConfirm
                      ? styles.filled
                      : ""
                  }`}
                >
                  비밀번호 확인
                </label>
              </div>

              {/* 에러/도움말 */}
              <div className={styles.helpTextWrap}>
                <p className={styles.errorMessage} aria-live="polite">
                  {error}
                </p>
                <p className={styles.helpText}>
                  이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </p>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className={styles.authBtnWrap}>
            <button type="submit" className={styles.authBtn}>
              <span className={styles.spinner} hidden></span>
              <span className={styles.authBtnText}>회원가입</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;