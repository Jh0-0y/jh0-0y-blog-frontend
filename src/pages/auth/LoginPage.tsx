import { useState, type FormEvent } from 'react';
import { useLogin } from '@/feature/auth/hooks';
import 
{ AuthHeader, 
  ErrorAlert, 
  FormInput, 
  SubmitButton, 
  AuthFooter } from '@/feature/auth/components';
import styles from './LoginPage.module.css';

export const LoginPage = () => {
  const { isLoading, error, fieldErrors, login, clearError } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  const handleInputChange = () => {
    if (error) clearError();
  };

  return (
    <>
      <AuthHeader
        title="로그인"
        subtitle="블로그에 오신 것을 환영합니다"
      />

      {error && <ErrorAlert message={error} />}

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
          id="password"
          type="password"
          label="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleInputChange();
          }}
          placeholder="비밀번호를 입력하세요"
          required
          disabled={isLoading}
          error={fieldErrors?.password}
        />

        <SubmitButton isLoading={isLoading} loadingText="로그인 중...">
          로그인
        </SubmitButton>
      </form>

      <AuthFooter
        text="계정이 없으신가요?"
        linkText="회원가입"
        linkTo="/auth/signup"
      />
    </>
  );
};