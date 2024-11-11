import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import SignEmailInput from '@/components/account/SignEmailInput';
import SignPasswordInput from '@/components/account/SIgnPasswordInput';
import { signUpSchema } from '@/schemas/signUpSchema';
import { useAppDispatch, useAppSelector } from '@/RTK/hooks';
import { signUp } from '@/RTK/authSlice';

type SignUpFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = async data => {
    try {
      const result = await dispatch(
        signUp({
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      ).unwrap();
      console.log('회원가입 성공', result);
      navigate('/sign-in');
    } catch (error) {
      console.error('회원가입 실패', error);
      // 왜 실패했는지 이유 로즥추가..? 해야함
    }
  };

  return (
    <div className="flex justify-center items-center h-[80%] w-full">
      <div className="max-w-lg w-full">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">회원가입</CardTitle>
            <CardDescription>커뮤니T의 친구가 되실 여러분 환영합니다</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="relative mb-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <SignEmailInput
                id="email"
                label="이메일"
                register={register('email')}
                error={errors.email}
              />

              <SignPasswordInput
                id="password"
                label="비밀번호"
                register={register('password')}
                error={errors.password}
              />

              <SignPasswordInput
                id="confirmPassword"
                label="비밀번호 확인"
                register={register('confirmPassword')}
                error={errors.confirmPassword}
              />

              {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}

              <div className="text-center w-full text-sm font-thin mb-4">
                <Link to="/sign-in" className="text-primary hover:underline">
                  이미 계정이 있으신가요? 로그인
                </Link>
              </div>

              <div className="pt-4 mt-8">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? '회원가입 중...' : '회원가입'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
