import React from 'react';
import { format, formatDistanceToNow, differenceInDays } from 'date-fns';
import { ko } from 'date-fns/locale';

type TimeProps = {
  time: string | Date;
  formatString?: string;
  relative?: boolean;
  showTime?: boolean;
};

const Time: React.FC<TimeProps> = ({
  time,
  // formatString = 'yyyy년 MM월 dd일',
  relative = false,
  showTime = false,
}) => {
  if (!time) return null;

  const date = new Date(time);
  const daysDifference = differenceInDays(new Date(), date);

  const timeFormat = showTime ? 'yyyy년 MM월 dd일 HH시 mm분' : 'yyyy년 MM월 dd일';

  const formattedTime =
    relative && daysDifference <= 7
      ? formatDistanceToNow(date, { addSuffix: true, locale: ko })
      : format(date, timeFormat);

  return <span>{formattedTime}</span>;
};

export default Time;
