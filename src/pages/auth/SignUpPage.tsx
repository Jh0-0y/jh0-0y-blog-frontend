import { useState, type FormEvent } from 'react';
import { useSignUp } from '@/feature/auth/hooks';
import 
{ AuthHeader, 
  ErrorAlert, 
  FormInput, 
  SubmitButton, 
  AuthFooter } from '@/feature/auth/components';
import styles from './SignUpPage.module.css';

export const SignUpPage = () => {
  const { isLoading, error, fieldErrors, signUp, clearError } = useSignUp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setLocalError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 길이 검증
    if (password.length < 8 || password.length > 20) {
      setLocalError('비밀번호는 8~20자로 입력해주세요.');
      return;
    }

    await signUp({ email, password, nickname });
  };

  const handleInputChange = () => {
    if (error) clearError();
    if (localError) setLocalError(null);
  };

  const displayError = localError || error;
  const confirmPasswordError =
    confirmPassword && password !== confirmPassword
      ? '비밀번호가 일치하지 않습니다'
      : undefined;

  return (
    <>
      <AuthHeader
        title="회원가입"
        subtitle="새로운 계정을 만들어보세요"
      />

      {displayError && <ErrorAlert message={displayError} />}

      <form className={styles.form} onSubmit={handleSubmit}>
        <FormInput
          id="email"
          type="email"
          label="이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleInputChange();
          }}
          placeholder="example@email.com"
          required
          disabled={isLoading}
          error={fieldErrors?.email}
        />

        <FormInput
          id="nickname"
          type="text"
          label="닉네임"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            handleInputChange();
          }}
          placeholder="2~20자로 입력하세요"
          required
          disabled={isLoading}
          minLength={2}
          maxLength={20}
          error={fieldErrors?.nickname}
        />

        <FormInput
          id="password"
          type="password"
          label="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleInputChange();
          }}
          placeholder="8~20자로 입력하세요"
          required
          disabled={isLoading}
          error={fieldErrors?.password}
        />

        <FormInput
          id="confirmPassword"
          type="password"
          label="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            handleInputChange();
          }}
          placeholder="비밀번호를 다시 입력하세요"
          required
          disabled={isLoading}
          error={confirmPasswordError}
        />

        <SubmitButton isLoading={isLoading} loadingText="가입 중...">
          회원가입
        </SubmitButton>
      </form>

      <AuthFooter
        text="이미 계정이 있으신가요?"
        linkText="로그인"
        linkTo="/login"
      />
    </>
  );
};