import { useState } from 'react';

type FormValues = {
  [key: string]: string;
};

const usePostForm = (initialValues: FormValues) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!values.title || values.title.length < 4) {
      setError('제목은 4자 이상이어야 합니다.');
      return false;
    }
    if (!values.content) {
      setError('내용을 입력해야 합니다.');
      return false;
    }
    setError(null);
    return true;
  };

  return { values, error, handleChange, validate };
};

export default usePostForm;
