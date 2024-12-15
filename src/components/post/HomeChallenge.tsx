import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, ThumbsUp, Flag } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  accountUsername: string;
  likeCount: number;
  challengeParticipantCount: number;
}

const fetchMostPopularChallenges = async () => {
  try {
    const response = await axios.get(
      'https://ozadv6.beavercoding.net/api/challenges?page=1&limit=2&sortBy=pureLikeCount&order=desc',
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.error('가장 인기 있는 챌린지 로드 실패:', error);
    return [];
  }
};

export default function HomeChallenge() {
  const [popularChallenges, setPopularChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPopularChallenges = async () => {
      setIsLoading(true);
      const data = await fetchMostPopularChallenges();
      setPopularChallenges(data);
      setIsLoading(false);
    };

    loadPopularChallenges();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h2 className="text-3xl font-bold">인기 챌린지</h2>

      {isLoading ? (
        <p>로딩 중...</p>
      ) : popularChallenges.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {popularChallenges.map(challenge => (
            <Card key={challenge.id} className="w-full">
              <Link to={`/challenges/${challenge.id}`}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">{challenge.title}</CardTitle>
                    <Badge variant="secondary">
                      <Flag className="w-4 h-4 mr-1" />
                      인기
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{challenge.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      <span>
                        {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{challenge.challengeParticipantCount} 참가자</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      <span>{challenge.likeCount} 좋아요</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end text-sm text-muted-foreground">
                  <span>개설자: {challenge.accountUsername || '익명의 사용자'}</span>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <p>현재 진행 중인 챌린지가 없습니다.</p>
      )}
    </div>
  );
}
