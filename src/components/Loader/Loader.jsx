import { PulseLoader } from 'react-spinners';

const Loader = ({ loading }) => {
  return (
    <PulseLoader
      color="black"
      cssOverride={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
      }}
      size={15}
      margin={4}
      speedMultiplier={1}
      loading={loading}
    />
  );
};

export default Loader;