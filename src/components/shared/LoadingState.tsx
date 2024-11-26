type LoadingStateProps = {
  message?: string;
};

const LoadingState = ({ message = 'Loading...' }: LoadingStateProps) => (
  <div className="container mx-auto p-4">{message}</div>
);

export default LoadingState;
