import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar } from 'lucide-react';
import { fetchChallengeEvent } from '@/api/challengeEvent';

const ChallengeEvent = () => {
  const { id } = useParams<{ id: string }>();
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChallengeEvents = async (id: string) => {
      if (!id) return;

      try {
        setIsLoading(true);
        const challengeEventsData = await fetchChallengeEvent(id);
        setEvents(challengeEventsData);
      } catch (err) {
        console.error('챌린지 이벤트 조회 실패: ', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchChallengeEvents(id);
    }
  }, [id]);

  if (isLoading) {
    return <div>챌린지 이벤트 목록을 조회 하고 있습니다.</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">챌린지 이벤트</h3>
      {events.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map(event => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>
                    {event.coordinate[0]}, {event.coordinate[1]}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-6">
            <Calendar className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
            <p>이 챌린지에 관련된 이벤트가 없습니다.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChallengeEvent;
